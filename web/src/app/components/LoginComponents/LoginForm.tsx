import { useEffect, useState } from "react";
import LogoV1 from "image/LogoV1.svg"
import image1 from "image/image1.svg"
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
        <div className="flex justify-center">
            <div className='flex flex-col items-center bg-gray-accent rounded-lg p-6 mt-8'>

                    <input className={`p-2 rounded border border-gray-300 bg-white m-6`}
                        placeholder="Enter a username"
                        value={inputValue}
                        type="text"
                        onChange={(e) => setInputValue(e.target.value)}>
                    </input>

                    <button className ='btntext border border-white hover:bg-blue-700 text-white rounded-lg px-4 py-1' onClick={handlePlayGame}>Play</button>
            </div>
        </div>
    );
}