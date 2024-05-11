import React from 'react';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:4000'; 

export default function ButtonSocketConnection() {
  
    const socket = io(SERVER_URL, {
        autoConnect: false
    });

    function connect() {
        socket.connect();
        if (socket.connected) {
            console.log("You have connected to the server");
        }
    }

    function disconnect() {
        socket.disconnect();
        if (socket.disconnected) {
            console.log("You have disconnected from the server");
        }
    }

  return (
    <>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
}