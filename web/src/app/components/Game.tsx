import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import GameWindow from "./GameWindow";
import PlayerList from "./PlayerList";

import socket from '@/scripts/SocketConnection';
import ButtonSocketConnection from "./ButtonSocketConnection";
import PlayerState from "../interfaces/PlayerState";

interface GameProps {
	roomID: string
}

export default function Game({roomID}: GameProps) {

    const [connected, setConnected] = useState(false);

    const [started, setStarted] = useState(false); 
    const [joined, setJoined] = useState(false);

    const [gameText, setGameText] = useState('');
    
    const [players, setPlayers] = useState<PlayerState>({});
    const [currPlayerID, setcurrPlayerID] = useState('');

    useEffect(() => {

        socket.on('connect', () => {
            setConnected(true);
            setcurrPlayerID(socket.id as string);
            socket.emit('joinRoom', roomID)
        });

        socket.on('disconnect', () => {
            setConnected(false);
            setJoined(false);
            setStarted(false);
        })

        socket.on('onJoin', (success) => {
            setJoined(success);
            if(!success) {
                alert("Game in progress");
                socket.disconnect();
                setConnected(false);
            }
        })

        socket.on('allPlayers', (players) => {
            setPlayers(players);
        })


        socket.on('startGame', (gameText) => {
            setGameText(gameText);
            setStarted(true);
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

        socket.on('endGame', (serverShutDown, id, player) => {
            setStarted(started => !started)

            if (!serverShutDown)
                alert(id + 'has won the game with WPM of ' + player.wpm)
        });

        socket.connect();

        return () => {
            socket.off();
            socket.off('connect');
            socket.off('disconnect');
            socket.off('joinRoom');
            socket.off('allPlayers')
            socket.off('startGame')
            socket.off('playerStateUpdate')
            socket.off('endGame')
            socket.disconnect();
        };
      }, []);

    const startGame = () => {
        socket.emit('startGame', roomID);
    }

    return  (
        <div className='layout flex h-full flex-col bg-transparent'>
            <ButtonSocketConnection/>
            {joined && (
                <section className="layout flex flex-col items-center gap-8 pt-8 text-center">
                    <PlayerList players={players}/> 
                    <button className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={startGame} hidden={started}>Start</button>
                </section>
            )}
            {started && <GameWindow gameText={gameText} players={players} playerID={currPlayerID}/>}
        </div>
    );
}

