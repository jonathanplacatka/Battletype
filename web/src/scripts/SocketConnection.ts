import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:4000'; 

const socket = io(SERVER_URL, {
    autoConnect: false
})

export default socket;