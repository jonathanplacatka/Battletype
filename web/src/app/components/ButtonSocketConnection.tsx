import React from 'react';
import socket from '@/scripts/SocketConnection';

export default function ButtonSocketConnection() {
  
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