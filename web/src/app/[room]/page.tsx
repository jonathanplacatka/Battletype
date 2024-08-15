
import Game from "../components/Game";

export async function generateMetadata({ params }: { params: { room: string } }) {
    const { room } = params;
    return {
        openGraph: {
            title: `Battletype - Room ${room}`,
            description: `Join room to play now!.`,
            siteName: 'Battletype'
        },
  };
}

export default function Room({ params }: { params: { room: string } }) {
  const { room } = params;
  return (
    <>
        <Game roomID={room}/>
    </>
  );
}


