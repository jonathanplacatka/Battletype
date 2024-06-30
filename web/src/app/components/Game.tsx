import { useEffect, useState } from "react";
import GameWindow from "./GameWindow";
import PlayerList from "./PlayerList";
import Header from "./PageLayout/Header";

import socket from '@/scripts/SocketConnection';
import ButtonSocketConnection from "./ButtonSocketConnection";
import PlayerState from "../interfaces/PlayerState";
import Head from "next/head";

export default function Game() {

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
        });

        socket.on('disconnect', () => {
            setConnected(false);
            setJoined(false);
            setStarted(false);
        })

        socket.on('joinRoom', (success) => {
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

        return () => {
            socket.off();
        };
      }, []);

    const startGame = () => {
        socket.emit('startGame');
    }

    return  (
        <div className='layout flex h-full flex-col bg-transparent'>
            <Header/>
            <ButtonSocketConnection/>
            {joined && (
                <section className="layout flex flex-col items-center gap-8 pt-8 text-center">
                    <PlayerList players={players}/> 
                    <button className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={startGame}>Start</button>
                </section>
            )}
            {started && <GameWindow gameText={gameText} players={players} playerID={currPlayerID}/>}
        </div>
    );
}

