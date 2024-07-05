'use client'

import { useEffect, useMemo, useRef, useState } from "react";
import fetchRandomWords from "./getrandomwords";

export default function SinglePlayer() {

    const [gameText, setGameText] = useState('');
    const [inputString, setInputString] = useState('');

    const caretRef = useRef<HTMLSpanElement>(null);
    const letterElementsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setGameText(fetchRandomWords())
    }, [])

    const pos = useMemo(() => {
        if (letterElementsRef.current) {
            const spanRef = letterElementsRef.current.children[inputString.length] as HTMLElement;
            console.log(inputString.length)
            if (spanRef) {
                //es6 destructuring
                const { offsetLeft: left, offsetTop: top} = spanRef;
                return { left: left-2, top: top};
            }
        }
        return { left: -2, top: 2 };
    }, [inputString]);

    useEffect(() => {
        if (caretRef.current) {
            caretRef.current.style.left = `${pos.left}px`;
            caretRef.current.style.top = `${pos.top}px`;
        }
    }, [pos]);

    return (
        <div className="relative my-5 bg-blue-100">
            <input 
                className="absolute left-0 top-0 z-20 h-full w-full opacity-0"
                type="text"
                value={inputString} 
                onChange={(e)=> {setInputString(e.target.value)}}
            />
            
            <div ref={letterElementsRef}>
                
                {gameText.split('').map((letter, index) => {

                    let color = "black";
                    let hasNoMisspelledText = inputString.slice(0, index) === gameText.slice(0, index);
                    
                    if (index < inputString.length) {
                        if (hasNoMisspelledText) {
                            color = letter === inputString[index] ? "green" : 'red'
                        } else {
                            color = "red"
                        }
                    }

                    return (
                        <span
                            key={letter + index}
                            style={{color}}
                            className=""
                        >
                            {letter}
                        </span>
                    )
                })}
            </div>
           
            {/* Caret */}
            <span
                ref={caretRef}
                style={{ position: 'absolute' }}
                >
                    |
            </span>
        </div>
    );
}
