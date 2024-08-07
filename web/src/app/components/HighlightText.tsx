import { useEffect, useMemo, useRef, useState } from "react";
import CharState from "../interfaces/CharState";

interface HighlightTextProps {
    originalText: string
    userInput: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onCorrectInput: () => void
    hasGameEnded: boolean
    hasGameStarted: boolean
}

export default function HighlightText({originalText, userInput, onChange, onCorrectInput, hasGameEnded, hasGameStarted}: HighlightTextProps) {

    const [gameText, setGameText] = useState<CharState[]>([]);
    const [inputString, setInputString] = useState(userInput);

    const inputRef = useRef<HTMLInputElement>(null);
    const caretRef = useRef<HTMLSpanElement>(null);
    const letterElementsRef = useRef<HTMLDivElement>(null);

    const [incorrectOnSpace, setIncorrectOnSpace] = useState(false);
    const [incorrectBlankPos, setIncorrectBlankPos] = useState(0);
    const [hasError, setHasError] = useState(false);
    const [firstErrorPos, setFirstErrorPos] = useState(0);
    const [maxLength, setMaxLength] = useState(0);
    
    if (inputRef.current && hasGameStarted) {
        inputRef.current.focus();
    }

    useEffect(() => {

        let gameData = originalText.replace(/\s?$/,'').split('').map((value, index) => {
            return {
                    "value" : value,
                    "index" : index,
                    "color": "gray"
                }
        }); 

        setGameText(gameData)
    }, [])

    // Calculate caret position
    const pos = useMemo(() => {
        
        if (letterElementsRef.current) {

            if (inputString.length === 0) {
                return { left: -2, top: 2 }; // Initial position
            }

            const spanRef = inputString.length < gameText.length 
                ? letterElementsRef.current.children[inputString.length] as HTMLElement
                : letterElementsRef.current.children[gameText.length - 1] as HTMLElement;

            if (spanRef) {

                const { offsetLeft: left, offsetTop: top, offsetWidth: width } = spanRef;

                return inputString.length >= gameText.length 
                    ? { left: left + width, top: top }
                    : { left: left - 2, top: top };

            }
        }

        return null;  // Return null if no valid position is found

    }, [inputString, gameText]);
    
    useEffect(() => {
        if (caretRef.current && pos) {
            caretRef.current.style.left = `${pos.left}px`;
            caretRef.current.style.top = `${pos.top}px`;
        }
    }, [pos]);

    useEffect(() => {

        if (letterElementsRef.current) {
            
            let spanPosition = inputString.length-1 === -1 ? 0 : inputString.length-1;
            const spanRef = letterElementsRef.current.children[spanPosition] as HTMLElement;

            if (spanRef) {

                //Are we back spacing?
                if (inputString.length < maxLength) {
                    
                    handleBackspacing()                    

                } else if (spanRef.textContent === inputString[spanPosition] && !incorrectOnSpace && !hasError) {
                    /* Case where user enter correct char and no errors on space.
                    /  The no errors on space is important as we do no want the user to enter gibberish 
                    /  then enter in correct words as this would mess up the logic of ending the game.
                    /  e.g., [....aasdf23dogs are cool]
                    /        The first 5 chars would be incorrect but the next characters (dog...) would be correct
                    /        So you can imagine if that scenario played out, the input value string would contain that gibberish 
                    //       and endgame would not proc.
                    */  

                    handleCorrectInput()
                   
                } else {

                    handleIncorrectInput(spanRef);
                }
            }
        }

        setMaxLength(inputString.length)

    }, [inputString])

    const handleBackspacing = () => {
        if (incorrectOnSpace) {
            //we want to remove the extra chars (if any was added) when we made an error on a space character.                    
            handleBackspacingOnIncorrectSpace();
        } else {
            handleNormalBackspace()
        }   
    }

    const handleBackspacingOnIncorrectSpace = () => {
        if (inputString.length === incorrectBlankPos - 1) {

            let item = {
                value: " ",
                index: inputString.length -1,
                color : 'gray'
            }

            setGameText([
                ...gameText.slice(0, inputString.length),
                Object.assign({}, inputString.length, item),
                ...gameText.slice(inputString.length + 1)
            ])

            setIncorrectBlankPos(0)
            setIncorrectOnSpace(prevState => !prevState)

            setFirstErrorPos(0)
            setHasError(prevError => !prevError)

        } else {

            setGameText([
                ...gameText.slice(0, maxLength - 1),
                ...gameText.slice(maxLength)
            ])
        }
    }

    const handleNormalBackspace = () => {
        let position = inputString.length === 0 && maxLength === 1 ? 0 : maxLength - 1;

        if (inputString.length === firstErrorPos - 1) { 
            setFirstErrorPos(0);
            setHasError(prevError => !prevError)
        }

        let item = {
            ...gameText[maxLength - 1],
            color : 'gray'
        }

        setGameText([
            ...gameText.slice(0, maxLength - 1),
            Object.assign({}, position, item),
            ...gameText.slice(maxLength)
        ])
    }

    const handleCorrectInput = () => {
        let item = {
            ...gameText[inputString.length-1],
            color : 'white'
        }

        setGameText([
            ...gameText.slice(0, inputString.length-1),
            Object.assign({}, inputString.length-1, item),
            ...gameText.slice(inputString.length)
        ])

        onCorrectInput();
    }

    const handleIncorrectInput = (spanRef : HTMLElement) => {
        
        if (!hasError) {
            setHasError(prevError => !prevError)
            setFirstErrorPos(inputString.length)
        }
    

        if (spanRef.textContent === ' ') {
            //This is the case where our incorrect char is first on a blank space.

            firstErrorOnSpace();

        } else if (incorrectOnSpace) {

            consequentErrorOnSpace();

        } else {

            handleNormalIncorrectChar(spanRef)
        } 
    }

    const firstErrorOnSpace = () => {
        setIncorrectOnSpace(prevState => !prevState);
        setIncorrectBlankPos(inputString.length);

        let item = {
            value: '_' ,
            index: inputString.length-1,
            color : 'red'
        }

        setGameText([
            ...gameText.slice(0, inputString.length-1),
            Object.assign({}, inputString.length-1, item),
            ...gameText.slice(inputString.length)
        ])
    }

    const consequentErrorOnSpace = () => {
        let value = inputString[inputString.length-1]
            
        //This is an edge case that we can remove or figure out a better solution for.
        if (value === ' ') {
            value = '_'
        }

        let item = {
            value: value ,
            index: inputString.length-1,
            color : 'red'
        }

        setGameText([
            ...gameText.slice(0, inputString.length-1),
            Object.assign({}, inputString.length, item),
            ...gameText.slice(inputString.length-1),
        ])
    }

    const handleNormalIncorrectChar = (spanRef : HTMLElement) => {

        //This deals with the edge case of the first incorrect char.
        if (inputString.length-1 === -1 && inputString[inputString.length] == undefined) {

            let item = {
                ...gameText[0],
                color : 'gray'
            }

            setGameText([
                ...gameText.slice(0, 0),
                Object.assign({}, 0, item),
                ...gameText.slice(1)
            ])
            

        } else {
            let value = spanRef.textContent === ' ' ? '_' : gameText[inputString.length-1].value

            let item = {
                value: value ,
                index: inputString.length-1,
                color : 'red'
            }

            setGameText([
                ...gameText.slice(0, inputString.length-1),
                Object.assign({}, inputString.length-1, item),
                ...gameText.slice(inputString.length)
            ])
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setInputString(e.target.value);
        onChange(e)
    }

    const renderGameText = () => {
        let originalText = []
        
        for (let i = 0; i < Object.keys(gameText).length; i++) {
            originalText.push(
                <span key={i} style={{ color : gameText[i].color }} className="px-0.1">
                    {gameText[i].value}
                </span>
            )
        }

        return originalText
    }

    return (
        <div className="relative my-5">
            <input 
                ref={inputRef}
                className="absolute left-0 top-0 z-20 h-full w-full opacity-0"
                type="text"
                value={inputString} 
                autoFocus
                onChange={handleInputChange}
                disabled={hasGameEnded}
            />
            
            <div ref={letterElementsRef} className="inline-block relative">
                {renderGameText()}
            </div>
           
            {/* Caret */}
            {!hasGameEnded && 
                <span
                    ref={caretRef}
                    style={{ position: 'absolute' }}
                    className='animate-blink'>
                        |
                </span>}
        </div>
    );
}
