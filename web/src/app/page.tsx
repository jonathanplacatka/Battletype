"use client"

import { useRouter } from 'next/navigation'
import Image from 'next/image';
import animatedGif from 'image/gamev3.gif'
import GamemodeButton from './components/GamemodeButton';

export default function Home() {

	const router = useRouter();

	return (
		<div className='flex justify-center my-10 '>
		 	<div className='flex w-9/12 space-x-4 '>
				<div id="gifContainer" className='flex flex-col m-8 p-8 rounded-lg bg-gray-accent text-white max-w-4xl'>

					<span className='mb-4 font-bold'> Welcome to Battletype!</span>
					<span className='mb-6'>Battletype is an online multiplayer typing game. Compete against your friends, or take a solo typing test!</span>
					<div className='bg-[#191919] rounded-[16px] w-full h-full'>
						<Image className='bg-gray-accent object-fit w-full h-full rounded-lg' src={animatedGif} alt='Animated gif of Battletype'/>
					</div>

				</div>
				
				<div id="buttonContainer" className='flex flex-col justify-between grow rounded-lg bg-gray-accent text-white m-8 p-8'> 

					<span className='mb-4 font-bold'> Select a Gamemode</span>
					<GamemodeButton 
						className='bg-[#EBEBEB]'
						icon={
							<svg className='' xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
								<path fill="currentColor" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7" />
							</svg>
						} 
						title='Multiplayer' 
						description='Test your typing skills vs. your friends or other players online' 
						onClickEvent={() => {router.push("/multiplayer")}}>
					</GamemodeButton>
					<GamemodeButton 
						className='bg-[#646263] pointer-events-none'
						icon={
							<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 56 56">
								<path fill="currentColor" d="M28.012 27.367c5.039 0 9.375-4.5 9.375-10.36c0-5.788-4.36-10.077-9.375-10.077c-5.016 0-9.375 4.383-9.375 10.125c0 5.812 4.36 10.312 9.375 10.312M13.293 49.07h29.438c3.68 0 4.992-1.054 4.992-3.117c0-6.047-7.57-14.39-19.711-14.39c-12.164 0-19.735 8.343-19.735 14.39c0 2.063 1.313 3.117 5.016 3.117" />
							</svg>
						} 
						title='Singleplayer' 
						description='WIP - Coming Soon!' 
						onClickEvent={() => {}}>
					</GamemodeButton>
					<GamemodeButton
						className='mb-auto bg-[#646263] pointer-events-none' 
						icon={
							<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
								<g fill="none" fillRule="evenodd">
									<path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
									<path fill="currentColor" d="M8.084 2.6c.162-.365.523-.6.923-.6h7.977c.75 0 1.239.79.903 1.462L15.618 8h3.358c.9 0 1.35 1.088.714 1.724L7.737 21.677c-.754.754-2.01-.022-1.672-1.033L8.613 13H5.015a1.01 1.01 0 0 1-.923-1.42z" />
								</g>
							</svg>
						} 
						title='Quickplay' 
						description='WIP - Coming Soon!' 
						onClickEvent={() => {}}>
					</GamemodeButton>
				</div>
			</div>
		</div>   
	);
}
