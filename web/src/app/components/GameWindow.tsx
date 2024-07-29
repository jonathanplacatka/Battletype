
import { useEffect, useState } from "react";
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
	const [countdown, setCountdown] = useState(3);

    const words = gameText.replace(/\s?$/,'').split(' '); //split and keep whitespace character, replace is used to remove last space char					  
	const [startTime, setStartTime] = useState(new Date());
	const [hasGameEnded, setHasGameEnded] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		
		if (!isTyping) {
			setIsTyping(true)
			setStartTime(new Date())
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
    
	const onCompleteWord = () => {
		
		players[playerID].score += 1

		//TODO: update WPM Dynamically.
		let WPM;

		socket.emit('playerStateUpdate', roomID, playerID, players[playerID].score, WPM);

		if (players[playerID].score === words.length) {
			let endTime = new Date();
			let numberOfWords = words.length
			WPM = Math.round(numberOfWords / (((endTime.getTime() - startTime.getTime()) / 1000) / 60))

			socket.emit('playerStateUpdate', roomID, playerID, players[playerID].score, WPM);

			setHasGameEnded(prevState => !prevState)
		}
    }

	useEffect(() => {
		let counter = 3;

		const countdownInterval = setInterval(() => {

			counter -= 1;
			setCountdown(counter);

			if (counter === 0) {
				clearInterval(countdownInterval);
				setCountdown(0);
			}

		}, 1000);
	},[])

    return (
        <div className="relative inline-flex flex-col w-3/4 p-6 mt-8"> 
			<Scoreboard players={players} playerID={playerID} numWords={words.length}/>
			<div className={ countdown > 0 ? 'blur-sm pointer-events-none' : ''}>
				<HighlightText originalText={gameText} userInput={completedText + input} onChange={onChange} hasGameEnded={hasGameEnded}/>
			</div>
			
			 { countdown > 0 && (
				<div className={`absolute ${Object.keys(players).length > 2 ? 'top-[75%]' : 'top-[65%]'}  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-white bg-black bg-opacity-70 p-4 rounded`}>
					Game starting in: {countdown}
				</div>
		 	)}

        </div>
    );
}