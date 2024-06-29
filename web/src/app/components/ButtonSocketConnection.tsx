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
      <div className='flex w-full flex-col items-center justify-between space-y-2 pt-12 sm:flex-row sm:space-y-0 sm:space-x-6 bg-gray-200' >
        <button className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={connect}>Connect</button>
        <button className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={disconnect}>Disconnect</button>
      </div>
    </>
  );
}