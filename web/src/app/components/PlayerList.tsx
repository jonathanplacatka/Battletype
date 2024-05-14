interface PlayerListProps {
    players: {
        [id: string]: {
            score: number;
            wpm: number;
        };
    };
}
export default function PlayerList({players} : PlayerListProps) {
    return (
        <div>
            <h3>Connected Players ({Object.keys(players).length})</h3>
            <ul>
                {Object.entries(players).map(([id, stats]) => (
                    <li key ={id}>{id} - score: {stats.score} wpm: {stats.wpm}</li>
                ))}
            </ul>
        </div>
    );
}