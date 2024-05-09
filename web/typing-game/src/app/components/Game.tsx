
import { useState } from "react";
import HighlightText from "./HighlightText";

export default function Game() {
    const text = "one two three four five six seven";
    const words = text.split(/(?<=\s)/);     //split and keep whitespace character
  
    const [input, setInput] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [completedText, setCompletedText] = useState('');

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
            <HighlightText value={text} compareString={completedText + input}/>
            <input autoFocus value={input} onChange={onChange}/>
        </div>
    );
}