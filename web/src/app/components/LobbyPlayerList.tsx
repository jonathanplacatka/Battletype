import PlayerState from "../interfaces/PlayerState";

interface LobbyPlayerListProps {
    players: PlayerState;
    playerID: string;
}

export default function LobbyPlayerList({players, playerID} : LobbyPlayerListProps) {
    return (
        <div className="rounded-md border px-4 py-4 min-h-52 min-w-60"> 
            <h2 className="text-white">Connected Players ({Object.keys(players).length}/4)</h2>
            <ul>
                {Object.entries(players).map(([id, {username, host}], index) => (
                    <div key={id + username}>
                        <li className="flex mx-2 my-2">
                            <span className="text-white">{id === playerID ? `${username} (you)` : username }</span>
                            {host &&  <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1.5em" viewBox="0 0 24 24"><path fill="#FFB743" d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14z"/></svg>}
                        </li>  
                    </div>   
                 ))}
            </ul>     
        </div>
    );
}