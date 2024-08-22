import { useState } from "react";

interface UsernameFieldProps {
    username: string,
    updateUsername: (newUsername: string) => void,
    closeModal: () => void
}

export default function UsernameField({username, updateUsername, closeModal} : UsernameFieldProps) {

    const [inputValue, setInputValue] = useState(username);
    const [hasUsernameError, setHasUsernameError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const changeUsername = () => {

        const validCharacterRegex: RegExp = /^[A-Za-z0-9-_ ]*$/

        if (inputValue.length < 3) {
            setHasUsernameError(true);
            setErrorMsg('Must contain at least 3 characters')
        } else if (inputValue.length > 15) {
            setHasUsernameError(true);
            setErrorMsg('Cannot contain more than 15 characters')
        } else if (!validCharacterRegex.test(inputValue)) {
            setHasUsernameError(true);
            setErrorMsg('Cannot contain special characters')
        } else {
            sessionStorage.setItem('username', inputValue);
            updateUsername(inputValue)
            setHasUsernameError(false);
            closeModal()
        }
    }

    const handleKeyDownEvent = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            changeUsername()
        }
    }

    return (
        <div className="flex justify-center">
            <div className='flex flex-col items-center rounded-lg p-2 w-full'>
                <input
                    data-autofocus
                    className={`p-2 rounded ${hasUsernameError ? 'border-2 border-red-600' : 'border border-gray-300'} bg-gray-accent mt-2 text-white`}
                    placeholder="Enter nickname"
                    minLength={3}
                    type="text"
                    onChange={(e) => setInputValue(e.target.value.trim())}
                    onKeyDown={handleKeyDownEvent}>
                </input>

                <span className={`m-2 text-red-600 text-xs text-center ${hasUsernameError ? 'opacity-100' : 'opacity-0'}`}>{errorMsg}</span>

                <button 
                    className='bg-[#275E9D] hover:bg-[#1C416B] text-white text-white rounded-lg px-3 py-2'
                    onClick={changeUsername}> Change
                </button>
            </div>
        </div>  
    );
}