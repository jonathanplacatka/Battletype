
import { useState } from "react";
import HighlightText from "./HighlightText";
import PlayerState from "../interfaces/PlayerState";
import socket from "@/scripts/SocketConnection";

interface GameWindowProps {
	gameText: string
	players: PlayerState
	playerID: string
}

export default function GameWindow({gameText, players, playerID} : GameWindowProps) {

    const [input, setInput] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [completedText, setCompletedText] = useState('');
    const [isTyping, setIsTyping] = useState(false); 

    const words = gameText.split(/(?<=\s)/); //split and keep whitespace character

	const [startTime, setStartTime] = useState(new Date());

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		
		if (!isTyping) {
			setIsTyping(true)
			setStartTime(new Date())
		}
		
		let currentWord = words[wordIndex];
		let val = e.target.value;
    
		if(val === currentWord) {
			setCompletedText(userText => userText + currentWord)
			setWordIndex(wordIndex => wordIndex + 1)
			setInput('');
			onCompleteWord();
		} else {
			setInput(e.target.value);
		}
    } 
    
	const onCompleteWord = () => {
		
		players[playerID].score += 1

		//TODO: Figure out how to update WPM Dynamically.
		let WPM;

		socket.emit('playerStateUpdate', playerID, players[playerID].score, WPM);

		if (players[playerID].score === words.length) {
			let endTime = new Date();
			let numberOfWords = words.length
			WPM = numberOfWords / (((endTime.getTime() - startTime.getTime()) / 1000) / 60)
			socket.emit('playerStateUpdate', playerID, players[playerID].score, WPM);
			
			setTimeout(() => {
				socket.emit('endGame', playerID)
			}, 3000)
		}
    }

    return (
        <div className="flex layout"> 
            <HighlightText value={gameText} compareString={completedText + input}/>
            <input autoFocus value={input} onChange={onChange}/>
        </div>
    );
}