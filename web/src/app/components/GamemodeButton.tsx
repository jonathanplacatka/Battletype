
type IconType = React.FC<React.SVGProps<SVGSVGElement>> | (() => JSX.Element);


interface GamemodeButtonProps {

    icon: JSX.Element
    title: string
    description: string
    onClickEvent: () => void
}

export default function GamemodeButton({icon, title, description, onClickEvent} : GamemodeButtonProps) {


    return (
        <button className ='flex flex-col mb-4 p-4 bg-[#EBEBEB] hover:bg-blue-700 text-black rounded-lg' onClick={onClickEvent}>
                            
            <div className='mb-2 flex items-center'>
                {icon}
                <span className='ml-4 font-bold'>{title}</span>
            </div>
            
            <span className=' text-sm'>{description}</span>
        </button>
    );

}