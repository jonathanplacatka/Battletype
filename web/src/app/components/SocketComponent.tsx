import React, { useEffect } from 'react';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:4000'; 

export default function SocketConnection() {
    useEffect(() => {
        const socket = io(SERVER_URL);

        socket.on('connect', () => {
            console.log('Connected to the server!');
        });

        socket.on('message', (message) => {
            console.log('Message from server:', message);   
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return null;
};
