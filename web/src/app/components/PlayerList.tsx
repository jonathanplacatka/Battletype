import PlayerState from "../interfaces/PlayerState";

interface PlayerListProps {
    players: PlayerState;
}

export default function PlayerList({players} : PlayerListProps) {
    return (
        <div>
            <h3>Connected Players ({Object.keys(players).length})</h3>
            <ul>
                {Object.entries(players).map(([id, {score, wpm}]) => (
                    <li key ={id}>{id} - score:{score} wpm:{wpm}</li>
                ))}
            </ul>
        </div>
    );
}