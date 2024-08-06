import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'

import GameWindow from "./GameWindow";
import GameOverWindow from "./GameOverWindow";
import Lobby from "./Lobby";

import socket from '@/scripts/SocketConnection';
import PlayerState from "../interfaces/PlayerState";

interface GameProps {
	roomID: string
}

enum GameState {
    Lobby, 
    GameStarted,
    GameOver,
}

export default function Game({roomID}: GameProps) {

    const currPlayerID = useRef('');

    const [players, setPlayers] = useState<PlayerState>({});
  
    const [gameState, setGameState] = useState(GameState.Lobby); 
    const [gameText, setGameText] = useState('');
    const [isHost, setIsHost] = useState(false);
    

    const router = useRouter()

    const createGuestName =  () => {
        //Currently a guest name is just "guess" + 4 random digits.
        return "guest" + (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    }

    useEffect(() => {

        socket.on('connect', () => {
            currPlayerID.current = socket.id as string;
            const username = sessionStorage.getItem('username') ?? createGuestName()
            socket.emit('joinRoom', roomID, username)
        });

        socket.on('disconnect', () => {
            disconnect();
        })

        socket.on('joinRoom', (success) => {
            if(!success) {
                alert("Game in progress");
                socket.disconnect();
            }
        })

        socket.on('allPlayers', (players) => {
            setPlayers(players);
            setIsHost(players[currPlayerID.current].host);
        })

        socket.on('startGame', (gameText) => {
            setGameText(gameText);
            setGameState(GameState.GameStarted);
        })

        socket.on('resetGame', () => {
            setGameState(GameState.Lobby);
        })

        socket.on('endGame', () => {
            setGameState(GameState.GameOver);
        })

        socket.on('playerScoreUpdate', (id, newScore, newPlace) => {
            setPlayers(prevPlayers => ({
                ...prevPlayers,
                [id]: {
                    ...prevPlayers[id],
                    score: newScore,
                    place: newPlace
                }
            }));
        })

        socket.on('playerWPMUpdate', (id, newWPM) => {
            setPlayers(prevPlayers => ({
                ...prevPlayers,
                [id]: {
                    ...prevPlayers[id],
                    WPM: newWPM,
                }
            }));
        })

        socket.connect();

        return () => {
            socket.off();
            socket.off('connect');
            socket.off('disconnect');
            socket.off('joinRoom');
            socket.off('allPlayers');
            socket.off('startGame');
            socket.off('endGame');
            socket.off('playerScoreUpdate');
            socket.off('playerWPMUpdate');
            socket.disconnect();
        };
    }, []);

    const startGame = () => {
        socket.emit('startGame', roomID);
    }

    const resetGame = () => {
        socket.emit('resetGame', roomID)
    }
    
    const disconnect = () => {
        socket.disconnect();
        if (socket.disconnected) {
            console.log("You have disconnected from the server");
        }
        router.push("/multiplayer")
    }

    return  (
        <div className='flex flex-col justify-center items-center bg-transparent'>
            {gameState === GameState.Lobby && (
                <Lobby roomID={roomID} players={players} isHost={isHost} playerID={currPlayerID.current} onStart={startGame} onLeave={disconnect}></Lobby>
            )}
            {gameState !== GameState.Lobby && (
                <>
                    <GameWindow roomID={roomID} playerID={currPlayerID.current} players={players} gameText={gameText}/>
                    {gameState === GameState.GameOver && (
                        <GameOverWindow isHost={isHost} playerID={currPlayerID.current} players={players} onPlayAgain={resetGame}/>
                    )}
                </>
            )}
        </div>
    );
}

