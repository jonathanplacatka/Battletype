
import { useState, useEffect } from "react";
import HighlightText from "./HighlightText";
import fetchRandomPoetry from "@/scripts/FetchTypingData";
import ButtonSocketConnection from "./ButtonSocketConnection";
import socket from "@/scripts/SocketConnection";

export default function Game() {
    // const text = "one two three four five six seven";
    const [text, setText] = useState('')
  
    const [input, setInput] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [completedText, setCompletedText] = useState('');

    useEffect(() => {
      //Will update later. Need to get better random data.
      fetchRandomPoetry().then((typingData) => {
        setText(typingData)
      })
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const words = text.split(/(?<=\s)/); //split and keep whitespace character

      let currentWord = words[wordIndex];
        let val = e.target.value;
      
        if(val === currentWord) {
          setCompletedText(userText => userText + currentWord)
          setWordIndex(wordIndex => wordIndex + 1)
          setInput('');
        } else {
          setInput(e.target.value);
        }

      socket.emit("newMsg", val);

    } 

    return (
        <div>
            <HighlightText value={text} compareString={completedText + input}/>
            <input autoFocus value={input} onChange={onChange}/>
            <ButtonSocketConnection/>
        </div>
    );
}