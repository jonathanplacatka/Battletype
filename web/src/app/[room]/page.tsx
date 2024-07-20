"use client"

import { useParams } from 'next/navigation'
import Game from "../components/Game";
import { UsernameContext } from '../context/UsernameContext';


export default function Room() {
  const roomID = useParams().room as string;

  return (
    <>
        <Game roomID={roomID}/>
    </>
  );
}


