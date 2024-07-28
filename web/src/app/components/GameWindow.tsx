
import { useRef, useState } from "react";
import HighlightText from "./HighlightText";
import PlayerState from "../interfaces/PlayerState";
import socket from "@/scripts/SocketConnection";
import ProgressBar from "./ProgressBar";
import Scoreboard from "./Scoreboard";

interface GameWindowProps {
	roomID: string
	playerID: string
	players: PlayerState
	gameText: string
}

export default function GameWindow({roomID, playerID, players, gameText} : GameWindowProps) {

    const [input, setInput] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [completedText, setCompletedText] = useState('');
    const [isTyping, setIsTyping] = useState(false); 

    const words = gameText.replace(/\s?$/,'').split(' '); //split and keep whitespace character, replace is used to remove last space char
														  
	
	
	const [hasGameEnded, setHasGameEnded] = useState(false);

	const correctKeystrokes = useRef(0);
	const startTime = useRef(0);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		
		if (!isTyping) {
			setIsTyping(true)
			startTime.current = performance.now();
		}
		
		let currentWord = words[wordIndex];
		let val = e.target.value.split(' ')[wordIndex];
    
		if(val === currentWord) {
			setCompletedText(userText => userText + currentWord)
			setWordIndex(wordIndex => wordIndex + 1)
			setInput('');
			onCompleteWord();
		} else {
			setInput(e.target.value);
		}
    } 

	const onCorrectInput = () => {
		correctKeystrokes.current++;
	}	
    
	const onCompleteWord = () => {
		
		players[playerID].score += 1

		let timeElapsed : number = (performance.now() - startTime.current) / 1000;
		console.log(timeElapsed);

		let words : number = correctKeystrokes.current / 5;
		let WPM : number = Math.round((words / timeElapsed) * 60);

		socket.emit('playerStateUpdate', roomID, playerID, players[playerID].score, WPM);

	
		// if (players[playerID].score === words.length) {
		// 	let endTime = new Date();
		// 	let numberOfWords = words.length
		// 	WPM = Math.round(numberOfWords / (((endTime.getTime() - startTime.getTime()) / 1000) / 60))

		// 	socket.emit('playerStateUpdate', roomID, playerID, players[playerID].score, WPM);

		// 	setHasGameEnded(prevState => !prevState)
		// }
    }

    return (
        <div className="relative inline-flex flex-col  w-3/4 p-6 mt-8'"> 
			<Scoreboard players={players} numWords={words.length}/>
            <HighlightText originalText={gameText} userInput={completedText + input} onChange={onChange} onCorrectInput={onCorrectInput} hasGameEnded={hasGameEnded}/>

        </div>
    );
}