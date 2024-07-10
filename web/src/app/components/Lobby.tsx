import React from 'react';

import LobbyPlayerList from './LobbyPlayerList';
import PlayerState from '../interfaces/PlayerState';

interface LobbyProps {
    roomID: string;
    players: PlayerState;
    onStart: () => void;
    onLeave: () => void;
};

export default function Lobby({roomID, players, onStart, onLeave}: LobbyProps) {
    return (
        <>
            <div className='relative inline-flex flex-col justify-left rounded-lg bg-gray-100 p-6 mt-8 '>
                <div className="flex-1 flex ">
                    <h1 className="mb-2">Room Code: {roomID}</h1>
                </div>
            
                <div className="flex-1 flex">
                    <LobbyPlayerList players={players}></LobbyPlayerList>

                    <div className='flex flex-col p-2 mx-4'>
                        
                        <button className ='btntext bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Copy Link</button>
                        <button className ='btntext bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded' onClick={onLeave}>Leave Room</button>
                        <button className ='btntext bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 rounded' onClick={onStart}>Start Game</button>
                        {/* <button disabled className ='btntext bg-gray-400 text-white font-bold py-2 px-4 mt-2 rounded'>Waiting for Host...</button> */}
                    
                    </div>
                </div>
            </div>
        </>
    );
}