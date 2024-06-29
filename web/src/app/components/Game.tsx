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
            <div className="flex w-full flex-col items-center space-y-2 pt-12 sm:flex-row sm:space-y-0 sm:space-x-6 bg-gray-200">
                <nav className="flex w-full flex-1 items-center justify-between sm:w-auto">
                    
                    Battle Type [Temp Name]

                    <div className="flex space-x-6">
                        <div className="relative">
                            <div className="peer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10  ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="peer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="peer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </div>
                        </div>
                    </div>                   
                </nav>
            </div> 
            
            <ButtonSocketConnection/>
            {connected && (
                <section className="layout flex flex-col items-center gap-8 pt-8 text-center">
                    <PlayerList players={players}/> 
                    <GameWindow gameText={gameText} onCompleteWord={onCompleteWord}/>
                </section>
            )}
        </div>
    );
}

