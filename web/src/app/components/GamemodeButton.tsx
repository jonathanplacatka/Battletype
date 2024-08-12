import { useEffect, useRef, useState } from "react";


type IconType = React.FC<React.SVGProps<SVGSVGElement>> | (() => JSX.Element);


interface GamemodeButtonProps {

    icon: JSX.Element
    title: string
    description: string
    onClickEvent: () => void
    optionalClass?: string
    disabled? : boolean
}

export default function GamemodeButton({icon, title, description, onClickEvent, optionalClass, disabled} : GamemodeButtonProps) {

    return (
        <button disabled={disabled} className ={`flex flex-col my-3 p-4 bg-[#EBEBEB] hover:bg-[#989595] text-black max-h-[92px] rounded-lg ${optionalClass} ${disabled ? 'bg-[#646262] pointer-events-none' : ''}`} onClick={onClickEvent}>
                            
            <div className='mb-2 flex items-center'>
                {icon}
                <span className='ml-4 font-bold'>{title}</span>
            </div>
            
            <span className='text-sm overflow-hidden'>{description}</span>
            
        </button>
    );

}