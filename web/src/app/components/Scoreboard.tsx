import React from 'react';
import PlayerState from '../interfaces/PlayerState';
import ProgressBar from './ProgressBar';
import playerColors from '@/scripts/PlayerColors';

interface ScoreboardProps {
    players: PlayerState
    numWords: number;
}

export default function ScoreboardProps({players, numWords}: ScoreboardProps) {
  return (
    <>
        {Object.entries(players).map(([id, {username, score, WPM, place}], index) => (
            <>
                <p>{username}</p>
                <div className="flex flex-row">
                    <ProgressBar score={score} numWords={numWords} color={playerColors[index]} />
                    <p className="-mt-1 ml-2">{WPM} WPM</p>
                </div>
            </>
        ))} 
    </>
  )
}
