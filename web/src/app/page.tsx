"use client"

import { useRouter } from 'next/navigation'
import Image from 'next/image';
import placeholderImg from 'image/PlaceholderGame.png'
import GamemodeButton from './components/GamemodeButton';


export default function Home() {

	const router = useRouter();

	const multiplayerIcon: () => JSX.Element = () => {

		return <svg className='' xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
			<path fill="currentColor" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7" />
		</svg>
	}

	return (

		<main className='flex justify-center my-10 bg-blue-200'>

		 	<div className='flex w-9/12 space-x-4 bg-green-200'>
				
				<div id="gifContainer" className='flex flex-col m-8 p-8 rounded-md bg-gray-accent max-w-4xl'>

					<span className=''> welcome to BattleType</span>

					<span className='m-4'> Battletype is an online multiplayer typing game. Compete against your friends, or take a solo typing test!</span>

					<Image className='m-4 rounded w-full h-full ' src={placeholderImg} alt=''/>

				</div>

				<div id="buttonContainer" className='flex flex-col grow rounded-md bg-gray-accent m-8 p-8'> 

					<span className='mb-4'> Select a Gamemode</span>

					<GamemodeButton 
						icon={
							<svg className='' xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
								<path fill="currentColor" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7" />
							</svg>
						} 
						title='Multiplayer' 
						description='Test your typing skills vs. your friends or other players online' 
						onClickEvent={() => {}}>
					</GamemodeButton>

					<GamemodeButton 
						icon={
							<svg className='' xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
								<path fill="currentColor" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7" />
							</svg>
						} 
						title='Multiplayer' 
						description='Test your typing skills vs. your friends or other players online' 
						onClickEvent={() => {}}>
					</GamemodeButton>

					<GamemodeButton 
						icon={
							<svg className='' xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
								<path fill="currentColor" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7" />
							</svg>
						} 
						title='Multiplayer' 
						description='Test your typing skills vs. your friends or other players online' 
						onClickEvent={() => {}}>
					</GamemodeButton>

				</div>

			</div>
		</main>   
	);
}
