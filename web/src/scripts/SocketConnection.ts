import io, { Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:4000'; 

const socket : Socket = io(SERVER_URL, {
    autoConnect: false
})

export default socket;