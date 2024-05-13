"use client"

import { io } from "socket.io-client";
import ButtonSocketConnection from "./components/ButtonSocketConnection";
import Game from "./components/Game";
import GameWindow from "./components/GameWindow";

export default function Home() {
  return (
    <main>
      <Game/>
    </main>
  );
}
