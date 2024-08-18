import { useState } from "react";
import { Modal } from "@mantine/core";
import UsernameField from "./LoginComponents/UsernameField";

interface ChangeUsernameModalProps {
    username: string,
    updateUsername: (newName : string) => void,
}

export default function ChangeUsernameModal({username, updateUsername}: ChangeUsernameModalProps) {

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Modal opened={openModal} onClose={() => {setOpenModal(false)}} size="xs" centered title="Change Nickname">
                <UsernameField username={username} updateUsername={updateUsername} closeModal={() => setOpenModal(false)}/>
            </Modal>

            <button onClick={() => setOpenModal(true)}>
                <svg className="pl-1 items-center" xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>
                </svg>
            </button>
        </>
    );
}
