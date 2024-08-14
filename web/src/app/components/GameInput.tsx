import { useRef, useState } from "react";

interface GameInputProps {
    gameText: string
    playerFinished: boolean
    gameStarted: boolean
    onCorrectKeystroke: () => void;
    onCompleteWord: () => void;
}

export default function GameInput({gameText, playerFinished, gameStarted, onCorrectKeystroke, onCompleteWord}: GameInputProps) {

    const [inputString, setInputString] = useState('');
    const [completedText, setCompletedText] = useState('');
    const [wordsCompleted, setWordsCompleted] = useState(0);
    const [isTyping, setIsTyping] = useState(false); 

    const typingTimeout = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const words = gameText.trim().split(/(?<=\s)/) //split and keep whitespace characters
    const currentWord = words[wordsCompleted] ?? "";
   
    if (inputRef.current && gameStarted) {
        inputRef.current.focus(); 
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        //disallow arrow key navigation in input field
        if(e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
        }

        //set timeout for caret animation 
        setIsTyping(true);
        if(typingTimeout.current) {
            window.clearTimeout(typingTimeout.current);
        }
        typingTimeout.current = window.setTimeout(() => {setIsTyping(false)}, 500);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentInput = e.target.value;

        if(currentWord === currentInput) {
            setInputString('');
            setCompletedText(prevText => prevText + currentWord);
		    setWordsCompleted(prevIndex => prevIndex + 1);
            onCompleteWord();
        } else {
		    setInputString(currentInput);
            if(firstDiffPos(currentWord, currentInput) === -1) {
                onCorrectKeystroke();
            }
        }
    } 

    const firstDiffPos = (toCompare: string, userInput: string) => {
        for(let i = 0; i < userInput.length; i++) {
            if(toCompare[i] !== userInput[i]) {
                return i;
            }
        }
        return -1;
    }

    const renderText = () => {
        const diffPos = firstDiffPos(words[wordsCompleted], inputString)
        const errorPos = diffPos === -1 ? completedText.length + inputString.length : completedText.length + diffPos;
        const overflowString = inputString.substring(currentWord.length);
        const caretPosition = completedText.length + inputString.length - overflowString.length;

        const correctText = gameText.slice(0, errorPos)
        const errorText = gameText.slice(errorPos, caretPosition);
        const afterCaret = gameText.slice(caretPosition);

        return (
            <>
                <div className="text-xl">
                    <span>{correctText}</span>
                    <span className="text-[#E93C3C]">{errorText.replace(/ /g, "_")}</span>
                    <span className="text-[#E93C3C] break-words">{overflowString.replace(/ /g, "_")}</span>
                    <span className={`text-[#808080] ${!playerFinished && 'caret'} ${!isTyping && 'caret-blink'}`}>{afterCaret}</span>
                </div>
            </>
          );
    } 

    return (
        <div className="relative my-5">
            <input 
                ref={inputRef}
                className="absolute left-0 top-0 h-full w-full opacity-0"
                type="text"
                value={inputString} 
                autoFocus
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={playerFinished}
            />

            <div>
                {renderText()}
            </div>
        </div>
    );
}
