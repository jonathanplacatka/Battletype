"use client"

import { useRouter } from 'next/navigation'

export default function Home() {

	const router = useRouter();

	return (

		<main>
			<button className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2' onClick={() => {router.push("multiplayer")}}>Multiplayer</button>
		</main>    
	);
}
