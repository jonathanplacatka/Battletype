import { useState } from "react";

interface UsernameFieldProps {
    username: string,
    updateUsername: (newUsername: string) => void,
    closeModal: () => void
}

export default function UsernameForm({username, updateUsername, closeModal} : UsernameFieldProps) {

    const [inputValue, setInputValue] = useState(username);
    const [hasUsernameError, setHasUsernameError] = useState(false);

    const changeUsername = () => {
        if (inputValue.trim().length < 3) {
            setHasUsernameError(true);
        } else {
            sessionStorage.setItem('username', inputValue);
            updateUsername(inputValue)
            setHasUsernameError(false);
            closeModal()
        }
    }

    return (
        <div className="flex justify-center">
            <div className='flex flex-col items-center rounded-lg p-2 w-full'>
                <input 
                    className={`p-2 rounded ${hasUsernameError ? 'border-2 border-red-600' : 'border border-gray-300'} bg-gray-accent mt-2 text-white`}
                    placeholder="Enter nickname"
                    minLength={3}
                    value={inputValue}
                    type="text"
                    onChange={(e) => setInputValue(e.target.value)}>
                </input>

                <span className={`m-2 text-red-600 ${hasUsernameError ? 'opacity-100' : 'opacity-0'}`}>Name must be 3 characters</span>

                <button 
                    className='bg-[#2C2C2C] hover:bg-blue-700 text-white text-white rounded-lg px-3 py-2'
                    onClick={changeUsername}> Change
                </button>
            </div>
        </div>  
    );
}