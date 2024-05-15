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
        socket.emit('playerStateUpdate', playerId, players[playerId].score+1, 0);
    }   

    return  (
        <div>
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

