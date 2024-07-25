"use client"

import LoginForm from './components/LoginComponents/LoginForm';

export default function Home() {

	return (
		<main>
			<LoginForm></LoginForm> 
			{/* <button className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2' onClick={() => {router.push("1234")}}>Join Room</button> */}
		</main>    
	);
}
