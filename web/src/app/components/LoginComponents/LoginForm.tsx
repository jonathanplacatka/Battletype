import { useEffect, useState } from "react";
import LogoV1 from "image/LogoV1.svg"
import Image from "next/image";
import { useRouter } from 'next/navigation'


export default function LoginForm() {

    const router = useRouter();

    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState(false);


    const handleEnterGameEvent = () => {
        
        //TODO: add better validation here if required.
        if (inputValue.trim().length != 0) {
            sessionStorage.setItem('username', inputValue);
            router.push("1234");
        } else {
            setInputError(true);
        } 
        
    }

    const handleAsGuest = () => {
        router.push("1234")

        if (sessionStorage.getItem("username") ) {
            sessionStorage.removeItem('username')
        }
    }

    useEffect(() => {

        if (sessionStorage.getItem("username") ) {
            setInputValue(sessionStorage.getItem("username") as string) //gets rid of annoying ts error, this should be fine because this already does a if check
        }

    }, [])

    useEffect(() => {

        if (inputError) {
            setInputError(prevState => !prevState);
        }

    }, [inputValue])

    return (
        <div className='flex flex-col justify-center items-center my-10'>
            <div className="relative inline-flex flex-col justify-center items-center rounded-lg bg-[#242424] p-6 mt-8">
                <div className="flex flex-col mb-3">
                    <Image src={LogoV1} alt="logo" width={550} height={150} className=""/> 
                </div>

                <div className="flex flex-col justify-center items-center w-full my-14">
                    <div className="flex flex-col items-start w-full max-w-xs">
                        <input className={`p-2 rounded border ${inputError ? 'border-red-500 border-2' : 'border-gray-300'} border-gray-300 bg-white w-full`}
                            placeholder="Enter a username"
                            value={inputValue}
                            type="text"
                            onChange={(e) => setInputValue(e.target.value)}>
                        </input>
                        <div className="mt-1 h-6">
                            {inputError && <span className="text-red-500">Username cannot be empty</span>}
                        </div>
                    </div>
                </div>
            
                <div className="">
                    <div className='flex flex-col p-3 mx-4'>
                        <button className ='btntext bg-[#2C2C2C] hover:bg-blue-700 text-white py-2 px-3 mx-5 my-4 rounded-lg' onClick={handleEnterGameEvent}>Enter</button>
                        <button className ='btntext bg-[#2C2C2C] hover:bg-blue-700 text-white py-2 px-3 mx-5 my-4 rounded-lg' onClick={handleAsGuest}>Play as Guest</button>
                    </div>
                </div>
            </div>
        </div>
    );
}