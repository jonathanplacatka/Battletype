"use client"

import { useParams } from 'next/navigation'
import Game from "../components/Game";

export default function Room() {
  const roomID = useParams().room as string;

  return (
    <>
        <Game roomID={roomID}/>
    </>
  );
}


