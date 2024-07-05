import React from 'react';
import socket from '@/scripts/SocketConnection';
import { useRouter } from 'next/navigation'

export default function ButtonSocketConnection() {
    const router = useRouter()

    function disconnect() {
        socket.disconnect();
        if (socket.disconnected) {
            console.log("You have disconnected from the server");
        }
        router.push("/")
    }

  return (
    <>
      <div className='layout flex justify-center items-center'>
        <button className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2' onClick={disconnect}>Disconnect</button>
      </div>
    </>
  );
}