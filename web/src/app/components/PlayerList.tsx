import PlayerState from "../interfaces/PlayerState";
import TableRow from "./TableRow";

interface PlayerListProps {
    players: PlayerState;
}

export default function PlayerList({players} : PlayerListProps) {
    return (
        <div className="relative overflow-auto rounded-lg bg-hl/50 p-2"> 
            <h3>Connected Players ({Object.keys(players).length})</h3>
            <table className='w-full overflow-hidden rounded-lg bg-gray-200'>
                <thead>
                  <tr className=''>
                    <td className='py-3 pl-4 pr-4 md:pr-0'>#</td>
                    <td className='px-2 md:px-0'>user</td>
                    <td className='px-2 md:px-0'>wpm</td>
                    <td className='px-2 md:pr-4'>score</td>
                    <td className='px-2 md:pr-4'>place</td>
                  </tr>  
                </thead>
                <tbody>
                    {Object.entries(players).map(([id, {score, WPM, place}], index) => (
                         <TableRow
                            key={id}
                            index={index}
                            username={id}
                            WPM={WPM}
                            score={score}
                            place={place}>
                        </TableRow>
                    ))}
                </tbody>
            </table>          
        </div>
    );
}