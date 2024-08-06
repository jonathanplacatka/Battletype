import { Button } from '@mantine/core';
import React from 'react';
import PlayerState, { Player } from '../interfaces/PlayerState';

interface GameOverProps {
    isHost: boolean;
    playerID: string;
    players: PlayerState;
    onPlayAgain: () => void;
};

export default function GameOver({isHost, playerID, players, onPlayAgain} : GameOverProps)  {

  const isWinner: boolean = players[playerID].place === 0;
  const winner: Player | undefined = Object.values(players).find(p => p.place === 0);

  return (
    <>
        <div className="flex flex-col items-center space-y-4">
            <p className="text-2xl">{isWinner ? "you win!" : `${winner?.username} wins!`}</p>
            {isHost ? (<Button onClick={onPlayAgain}>Play Again</Button>) : (<Button disabled className="bg-gray-400">Waiting for Host</Button>)}

        </div>
    </>
  );
}