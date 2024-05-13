
import { useState } from "react";
import HighlightText from "./HighlightText";

interface GameWindowProps {
  gameText: string
}

export default function GameWindow({gameText} : GameWindowProps) {

    const [input, setInput] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [completedText, setCompletedText] = useState('');

    const words = gameText.split(/(?<=\s)/); //split and keep whitespace character

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let currentWord = words[wordIndex];
        let val = e.target.value;
      
        if(val === currentWord) {
          setCompletedText(userText => userText + currentWord)
          setWordIndex(wordIndex => wordIndex + 1)
          setInput('');
        } else {
          setInput(e.target.value);
        }
    } 

    return (
        <div>
            <HighlightText value={gameText} compareString={completedText + input}/>
            <input autoFocus value={input} onChange={onChange}/>
        </div>
    );
}