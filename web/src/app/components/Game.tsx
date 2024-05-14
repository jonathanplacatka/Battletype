import { useEffect, useState } from "react";
import GameWindow from "./GameWindow";
import PlayerList from "./PlayerList";

import socket from '@/scripts/SocketConnection';
import ButtonSocketConnection from "./ButtonSocketConnection";

export default function Game() {

    const [connected, setConnected] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameText, setGameText] = useState('');
    const [playerList, setPlayerList] = useState([]);


    useEffect(() => {
        socket.on('connect', () => {
            setConnected(true);
        });

        socket.on('disconnect', () => {
            setConnected(false);
            setGameStarted(false);
        })

        socket.on('playerList', (list) => {
            setPlayerList(list);
        })

        socket.on('gameStart', (gameText) => {
            setGameText(gameText)
            setGameStarted(true);
        })

        return () => {
            socket.off();
        };
      }, []);


    return  (
        <div>
            <ButtonSocketConnection/>
            {connected && (
                <>
                <button onClick={()=>{socket.emit('gameStart')}}>Start</button>
                <PlayerList players={playerList}/>
                {gameStarted && <GameWindow gameText={gameText} onCompleteWord={onCompleteWord}/>}
                </>
            )}
        </div>
    );
}

function onCompleteWord() {
    //wpm calculations go here
    //emit wpm with score
    
    socket.emit('playerStateUpdate', 1)
}