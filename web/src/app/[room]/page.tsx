"use client"

import { useParams } from 'next/navigation'
import Game from "../components/Game";
import { useContext } from 'react';
import { UsernameContext } from '../context/UsernameContext';


export default function Room() {
  const roomID = useParams().room as string;
  const userName = useContext(UsernameContext);

  return (
    <>
        <Game roomID={roomID}/>
    </>
  );
}


