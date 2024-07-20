import { useEffect, useState } from "react";
import LogoV1 from "image/LogoV1.svg"
import Image from "next/image";
import { useRouter } from 'next/navigation'


export default function LoginForm() {

    const router = useRouter();

    const [inputValue, setInputValue] = useState('');


    const handleEnterGameEvent = () => {
        
        //TODO: add better validation here if required.
        if (inputValue.trim().length != 0) {
            sessionStorage.setItem('username', inputValue)
            router.push("1234")
        } 
            //handle error validation in the this clause

    }

    useEffect(() => {
        if (sessionStorage.getItem("username") ) {
            setInputValue(sessionStorage.getItem("username") as string) //gets rid of annoying ts error, this should be fine because this already does a if check
        }
    }, [])


    return (
        <div className='flex flex-col justify-center items-center my-10'>
            <div className="relative inline-flex flex-col justify-center items-center rounded-lg bg-[#242424] p-6 mt-8">
                <div className="flex flex-col mb-3">
                    <Image src={LogoV1} alt="logo" width={550} height={150} className=""/> 
                </div>

                <div className="flex flex-col justify-center items-center w-full my-14" >
                    <input className="p-2 rounded border border-gray-300 bg-white"
                        placeholder="Enter a username"
                        value={inputValue}
                        type="text"
                        onChange={(e) => setInputValue(e.target.value)}>
                    </input>
                </div>
            
                <div className="">
                    <div className='flex flex-col p-3 mx-4'>
                        <button className ='btntext bg-[#2C2C2C] hover:bg-blue-700 text-white py-2 px-3 mx-5 my-4 rounded-lg' onClick={handleEnterGameEvent}>Enter</button>
                        <button className ='btntext bg-[#2C2C2C] hover:bg-blue-700 text-white py-2 px-3 mx-5 my-4 rounded-lg'>Play as Guest</button>
                    </div>
                </div>
            </div>
        </div>
    );
}