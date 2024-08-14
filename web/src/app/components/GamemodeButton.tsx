interface GamemodeButtonProps {
    icon: JSX.Element
    title: string
    description: string
    onClickEvent: () => void
    className?: string
}

export default function GamemodeButton({icon, title, description, onClickEvent, className} : GamemodeButtonProps) {
    return (
        <button className ={`flex flex-col my-3 p-4 bg-[#EBEBEB] hover:bg-[#989595] text-black max-h-[92px] rounded-lg ${className}`} onClick={onClickEvent}>          
            <div className='mb-2 flex items-center'>
                {icon}
                <span className='ml-4 font-bold'>{title}</span>
            </div>
            <span className='text-sm overflow-hidden'>{description}</span>
        </button>
    );
}