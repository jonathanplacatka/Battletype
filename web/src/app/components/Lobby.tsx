import React, { useEffect, useRef, useState } from 'react';

import LobbyPlayerList from './LobbyPlayerList';
import PlayerState from '../interfaces/PlayerState';

interface LobbyProps {
    roomID: string;
    players: PlayerState;
    isHost: boolean;
    playerID: string;
    onStart: () => void;
    onLeave: () => void;
};

export default function Lobby({roomID, players, isHost: isCurrPlayerHost, playerID, onStart, onLeave}: LobbyProps) {
    const copyRef = useRef<HTMLButtonElement>(null);
    const [disabledCopyBtn, setDisabledCopyBtn] = useState(false);

    const copyLink = () => {
        
        if (copyRef.current) {
            navigator.clipboard.writeText(window.location.toString())
            setDisabledCopyBtn(prevState => !prevState)

            setTimeout(() => {
                if (copyRef.current) {
                    setDisabledCopyBtn(prevState => !prevState)
                }
            }, 2000)
        }
        
    }

    return (
        <>
            <div className='bg-gray-accent rounded-lg p-6 mt-8 '>
                <h1 className="mb-2 text-white">Room Code: {roomID}</h1>
                <div className="flex">
                    <LobbyPlayerList players={players} playerID={playerID}></LobbyPlayerList>
                    <div className='flex flex-col p-2 mx-4'>
                        <button ref={copyRef} disabled={disabledCopyBtn} className={`btntext  ${disabledCopyBtn ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700 text-white'}  font-bold py-2 px-4 rounded min-w-[201px]`} onClick={copyLink}> {`${disabledCopyBtn ? 'Copied' : `Copy Link`}`}</button>
                        <button className ='btntext bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded min-w-[201px]' onClick={onLeave}>Leave Room</button>
                        <button className ={`btntext ${isCurrPlayerHost ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-400' }  text-white font-bold py-2 px-4 mt-2 rounded min-w-[201px]`} disabled={!isCurrPlayerHost} onClick={onStart}>{`${isCurrPlayerHost ? 'Start Game' : `Waiting for Host...`}`}</button>
                    </div>
                </div>
            </div>
        </>
    );
}