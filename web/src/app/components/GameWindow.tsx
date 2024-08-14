import { useEffect, useRef, useState } from "react";
import PlayerState from "../interfaces/PlayerState";
import socket from "@/scripts/SocketConnection";
import Scoreboard from "./Scoreboard";

import GameInput from "./GameInput";

interface GameWindowProps {
	roomID: string
	playerID: string
	players: PlayerState
	gameText: string
}

export default function GameWindow({roomID, playerID, players, gameText} : GameWindowProps) {

    const [playerFinished, setPlayerFinished] = useState(false);
    const [countdown, setCountdown] = useState(3);

    const words = gameText.trim().split(' ');

    const correctKeystrokes = useRef(0);
    const startTime = useRef(0);
    const wpmIntervalID = useRef(0);
	const countdownIntervalID = useRef(0);

    useEffect(() => {
		wpmIntervalID.current = window.setInterval(updateWPM, 1000);
    }, []);

    useEffect(() => {
        countdownIntervalID.current = window.setInterval(() => {
            setCountdown(count => count-1);
        }, 1000);
        return () => clearInterval(countdownIntervalID.current);
    },[])

	useEffect(() => {
        if (countdown === 0) {
            startTime.current = performance.now();
            clearInterval(countdownIntervalID.current)
        }
    }, [countdown])

	const onCorrectInput = () => {
		correctKeystrokes.current++;
	}	
    
	const onCompleteWord = () => {
		players[playerID].score += 1
	
		if (players[playerID].score === words.length) {
			setPlayerFinished(true);
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
        <div className="relative inline-flex flex-col w-3/4 p-6 mt-8"> 
            <Scoreboard players={players} playerID={playerID} numWords={words.length}/>

            <div className={ countdown > 0 ? 'blur-sm pointer-events-none' : ''}>
                <GameInput gameText={gameText} playerFinished={playerFinished} gameStarted={countdown === 0} onCorrectKeystroke={onCorrectInput} onCompleteWord={onCompleteWord} />
            </div>

             {countdown > 0 && (
                <div className={`absolute ${Object.keys(players).length > 2 ? 'top-[75%]' : 'top-[65%]'}  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-white bg-black bg-opacity-70 p-4 rounded`}>
                    Game starting in: {countdown}
                </div>
            )}
        </div>
    );
}