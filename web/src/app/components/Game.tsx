import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import GameWindow from "./GameWindow";

import socket from '@/scripts/SocketConnection';
import ButtonSocketConnection from "./ButtonSocketConnection";
import PlayerState from "../interfaces/PlayerState";
import Lobby from "./Lobby";

interface GameProps {
	roomID: string
}

export default function Game({roomID}: GameProps) {

    const [connected, setConnected] = useState(false);
    const [started, setStarted] = useState(false); 
    const [gameText, setGameText] = useState('');

    const [players, setPlayers] = useState<PlayerState>({});
    const [currPlayerID, setcurrPlayerID] = useState('');

    const router = useRouter()

    const createGuestName =  () => {
        //Currently a guest name is just "guess" + 4 random digits.
        return "guest" + (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    }

    useEffect(() => {

        socket.on('connect', () => {
            setConnected(true);
            setcurrPlayerID(socket.id as string);
            const username = sessionStorage.getItem('username') ?? createGuestName()
            socket.emit('joinRoom', roomID, username)
        });

        socket.on('disconnect', () => {
            setConnected(false);
            setStarted(false);
        })

        socket.on('joinRoom', (success) => {
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

        socket.on('playerStateUpdate', (id, newScore, newWPM, newPlace) => {
            setPlayers(prevPlayers => ({
                ...prevPlayers,
                [id]: {
                    username: prevPlayers[id].username,
                    score: newScore,
                    WPM: newWPM,
                    place: newPlace,
                    host: prevPlayers[id].host,
                }
            }));
        })

        socket.connect();

        return () => {
            socket.off();
            socket.off('connect');
            socket.off('disconnect');
            socket.off('joinRoom');
            socket.off('allPlayers')
            socket.off('startGame')
            socket.off('playerStateUpdate')
            socket.disconnect();
        };
    }, []);

    const startGame = () => {
        socket.emit('startGame', roomID);
    }

    const disconnect = () => {
        socket.disconnect();
        if (socket.disconnected) {
            console.log("You have disconnected from the server");
        }
        router.push("/")
    }

    return  (
        <div className='flex flex-col justify-center items-center bg-transparent'>
            {!started && (
                <Lobby roomID={roomID} players={players} currPlayerID={currPlayerID} onStart={startGame} onLeave={disconnect}></Lobby>
            )}
            {started && (
                <>
                    <GameWindow roomID={roomID} playerID={currPlayerID} players={players} gameText={gameText} />
                    <ButtonSocketConnection></ButtonSocketConnection>
                </>
            )}
        </div>
    );
}

