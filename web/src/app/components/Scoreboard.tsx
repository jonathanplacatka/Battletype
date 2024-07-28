import React from 'react';
import PlayerState from '../interfaces/PlayerState';
import ProgressBar from './ProgressBar';
import playerColors from '@/scripts/PlayerColors';

interface ScoreboardProps {
    players: PlayerState
    playerID: string;
    numWords: number;
}

export default function ScoreboardProps({players, playerID, numWords}: ScoreboardProps) {
  return (
    <>
        {Object.entries(players).map(([id, {username, score, WPM, place}], index) => (
            <>
                <p>{id === playerID ? `${username} (you)` : username }</p>
                <div className="flex flex-row">
                    <ProgressBar score={score} numWords={numWords} color={playerColors[index]} />
                    <p className="-mt-1 ml-2">{0} wpm</p>
                </div>
            </>
        ))} 
    </>
  )
}
