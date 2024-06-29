import { useEffect, useState } from "react";
import GameWindow from "./GameWindow";
import PlayerList from "./PlayerList";

import socket from '@/scripts/SocketConnection';
import ButtonSocketConnection from "./ButtonSocketConnection";
import PlayerState from "../interfaces/PlayerState";

export default function Game() {

    const [connected, setConnected] = useState(false);
    const [gameText, setGameText] = useState('');
    
    const [players, setPlayers] = useState<PlayerState>({});
    const [playerId, setPlayerId] = useState('');

	const [completedAmountOfWords, setCompletedAmountOfWords] = useState(0);
	const [startTime, setStartTime] = useState(new Date());
	
	const listOfWords = gameText.split(' ')

    useEffect(() => {
        socket.on('connect', () => {
            setConnected(true);
            setPlayerId(socket.id as string);
        });

        socket.on('disconnect', () => {
            setConnected(false);
        })

        socket.on('allPlayers', (players) => {
            setPlayers(players);
        })

        socket.on('gameText', (gameText) => {
            setGameText(gameText)
        })

        socket.on('playerStateUpdate', (id, score, wpm) => {
            setPlayers(prevPlayers => ({
                ...prevPlayers,
                [id]: {
                    score: score,
                    wpm: wpm
                }
            }));
        })

        return () => {
            socket.off();
        };
      }, []);

    const onCompleteWord = () => {
		setCompletedAmountOfWords(completedAmountOfWords => completedAmountOfWords + 1)
		let numberOfCompleteWords = completedAmountOfWords + 1

		//This is inaccurate since we only start the timer when we complete the first word.
		if (numberOfCompleteWords === 1) {
			setStartTime(new Date())
		}

		//Ideally I shouldn't need to do but because the setCompletedAmountOfWords method won't update till next render, 
		//I need to deal with this now, and check now with a local variable, since `setCompletedAmountOfWords` won't be updated till next render.
		let WPM;

		if (numberOfCompleteWords === listOfWords.length) {
			let endTime = new Date();
			let numberOfWords = listOfWords.length
			WPM = numberOfWords / (((endTime.getTime() - startTime.getTime()) / 1000) / 60)
		}

        socket.emit('playerStateUpdate', playerId, players[playerId].score+1, WPM);
    }   

    return  (
        <div className='layout flex h-full flex-col bg-transparent'>
            <ButtonSocketConnection/>
            {connected && (
                <>
                <PlayerList players={players}/> 
                <GameWindow gameText={gameText} onCompleteWord={onCompleteWord}/>
                </>
            )}
        </div>
    );
}

