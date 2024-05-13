interface PlayerListProps {
    players: string[]
}
export default function PlayerList({players} : PlayerListProps) {
    return (
        <div>
            <h3>Connected Players ({players.length})</h3>
            <ul>
                {players.map((player) => <li key={player}>{player}</li>)}
            </ul>
        </div>
    );
}