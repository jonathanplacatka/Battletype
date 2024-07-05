"use client"

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main>
        <h1>HOME PAGE</h1>
        <button className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2' onClick={() => {router.push("1234")}}>Join Room</button>
    </main>
  );
}
