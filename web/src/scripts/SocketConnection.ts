import io, { Socket } from 'socket.io-client';

const url = process.env.NEXT_PUBLIC_GAME_SERVER_URL ?? "http://localhost:4000";

const socket : Socket = io(url, {
    autoConnect: false
});

export default socket;