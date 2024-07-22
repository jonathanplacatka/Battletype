import { useEffect, useState } from "react";
import LogoV1 from "image/LogoV1.svg"
import Image from "next/image";
import { useRouter } from 'next/navigation'


export default function LoginForm() {

    const router = useRouter();

    const [inputValue, setInputValue] = useState('');

    const handlePlayGame = () => {
        
        if (inputValue.trim().length != 0) {
            sessionStorage.setItem('username', inputValue);
            router.push("1234");
        } else {
            router.push("1234")

            if (sessionStorage.getItem("username") ) {
                sessionStorage.removeItem('username')
            }
        } 
        
    }

    useEffect(() => {

        let username: string | null = sessionStorage.getItem("username");
        if (username) {
            setInputValue(username)
        }

    }, [])

    return (
        <div className='flex flex-col justify-center items-center my-10'>
            <div className="relative inline-flex flex-col justify-center items-center rounded-lg bg-[#242424] p-6 mt-8">
                <div className="flex flex-col mb-3">
                    <Image src={LogoV1} alt="logo" width={550} height={150} className=""/> 
                </div>

                <div className="flex flex-col justify-center items-center w-full my-14">
                    <div className="flex flex-col items-start w-full max-w-xs">
                        <input className={`p-2 rounded border border-gray-300 bg-white w-full`}
                            placeholder="Enter a username"
                            value={inputValue}
                            type="text"
                            onChange={(e) => setInputValue(e.target.value)}>
                        </input>
                        {/* This is validation code */}
                        {/* <div className="mt-1 h-6">
                            {inputError && <span className="text-red-500">Username cannot be empty</span>}
                        </div> */}
                    </div>
                </div>
            
                <div className="">
                    <div className='flex flex-col p-3 mx-4'>
                        <button className ='btntext bg-[#2C2C2C] hover:bg-blue-700 text-white py-2 px-3 mx-5 my-4 rounded-lg' onClick={handlePlayGame}>Play</button>
                    </div>
                </div>
            </div>
        </div>
    );
}