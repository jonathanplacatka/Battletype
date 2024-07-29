
import { useEffect, useRef, useState } from "react";
import HighlightText from "./HighlightText";
import PlayerState from "../interfaces/PlayerState";
import socket from "@/scripts/SocketConnection";
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
	
	const wpmIntervalID = useRef(0);

	useEffect(() => {
		wpmIntervalID.current = window.setInterval(updateWPM, 1000);
		return () => window.clearInterval(wpmIntervalID.current);
	}, []);

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
	
		if (players[playerID].score === words.length) {
			setHasGameEnded(prevState => !prevState);
			window.clearInterval(wpmIntervalID.current); //disable WPM updates
		}

		socket.emit('playerScoreUpdate', roomID, playerID, players[playerID].score);
    }

	const updateWPM = () => {

		let timeElapsed : number = (performance.now() - startTime.current) / 1000;
		let wordsCompleted : number = correctKeystrokes.current / 5;
		let WPM : number = Math.round((wordsCompleted / timeElapsed) * 60);

		socket.emit('playerWPMUpdate', roomID, playerID, WPM);
	}
	

    return (
        <div className="relative inline-flex flex-col  w-3/4 p-6 mt-8'"> 
			<Scoreboard players={players} playerID={playerID} numWords={words.length}/>
            <HighlightText originalText={gameText} userInput={completedText + input} onChange={onChange} onCorrectInput={onCorrectInput} hasGameEnded={hasGameEnded}/>
        </div>
    );
}