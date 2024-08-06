import React from 'react';
import PlayerState from '../interfaces/PlayerState';
import ProgressBar from './ProgressBar';
import { playerColors, placeColors, ordinals } from '@/scripts/const';

interface ScoreboardProps {
    players: PlayerState
    playerID: string;
    numWords: number;
}

export default function ScoreboardProps({players, playerID, numWords}: ScoreboardProps) {
  return (
    <>
        {Object.entries(players).map(([id, {username, score, WPM, place}], index) => (
            <div key={id}>
                <p>{id === playerID ? `${username} (you)` : username }</p>
                <div className="flex space-x-2">
                    <ProgressBar score={score} numWords={numWords} color={playerColors[index]} />

                   
                        <p className="-mt-1 w-20">{WPM} wpm</p>
                        <p className="-mt-1 w-4" style={{color: placeColors[place]}}>{ordinals[place]}</p>
                  
                </div>
            </div>
        ))} 
    </>
  )
}
