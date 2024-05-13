import { useEffect, useState } from "react";
import GameWindow from "./GameWindow";
import PlayerList from "./PlayerList";

import socket from '@/scripts/SocketConnection';
import ButtonSocketConnection from "./ButtonSocketConnection";


export default function Game() {

    const [isConnected, setConnected] = useState(false)
    const [playerList, setPlayerList] = useState([]);

    useEffect(() => {
        socket.on('connect', () => {
            setConnected(true);
        });

        socket.on('disconnect', () => {
            setConnected(false);
        })

        socket.on('playerList', (list) => {
            setPlayerList(list);
        })

        return () => {
            socket.off();
        };
      }, []);


    return  (
        <div>
            <ButtonSocketConnection/>
            {isConnected && (
                <>
                <GameWindow/>
                <PlayerList players={playerList}/>
                </>
            )}
        </div>
    );
}