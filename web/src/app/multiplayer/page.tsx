"use client"

import { Button, ScrollArea, Table, TextInput } from '@mantine/core';
import ChangeUsernameModal from '../components/ChangeUsernameModal';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import socket from '@/scripts/SocketConnection';
import generateGuestName from '@/scripts/GenerateGuestName';

interface Room {
    roomID: string;
    players: object;
    maxCapacity: number;
}
  
export default function Multiplayer() {

    const router = useRouter();

    const [username, setUsername] = useState('');

    const [rooms, setRooms] = useState<Room[]>([]);
    const [search, setSearch] = useState('');
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        //TODO: Maybe implement a better search function?? Kinda trash/wonky
        const { value } = event.currentTarget;
        setSearch(value);

        if (search.length != 0) {
            const filtered = rooms.filter((room) => {

                const roomIDMatches = room.roomID.toLowerCase().includes(value.toLowerCase());
                const hostUsernameMatches = Object.values(room.players).some(
                    player => player.host && player.username.toLowerCase().includes(value.toLowerCase())
                );

                return roomIDMatches || hostUsernameMatches
            });

            setFilteredRooms(filtered);
        } 
    };

    useEffect(() => {
        setFilteredRooms(rooms)
    }, [rooms])

    const rows = filteredRooms.map((element) => {

        const hostname = Object.values(element.players).find((player) => player.host === true).username

        return (
            <Table.Tr key={element.roomID}>
                <Table.Td className="w-[25%]">{element.roomID}</Table.Td>
                <Table.Td className="w-[25%]" style={{ textAlign: 'left' }}>{hostname}</Table.Td>
                <Table.Td className="w-[25%] pl-5" style={{ textAlign: 'left' }}>{Object.keys(element.players).length} / {element.maxCapacity}</Table.Td>
                <Table.Td className="w-[25%]"> 
                    <Button 
                        className='border-white'
                        variant="outline" 
                        color="gray"
                        radius="md" 
                        disabled={Object.keys(element.players).length === element.maxCapacity} 
                        onClick={() => joinRoom(element, element.roomID)}
                        >
                        {Object.keys(element.players).length === element.maxCapacity ? 'Full' : 'Join'}
                    </Button>
                </Table.Td>
            </Table.Tr>
        );
    });

    const joinRoom = (room: Room, roomID : string) => {
        if (Object.keys(room.players).length < room.maxCapacity) {
            router.push(roomID)
        }
    }

    const createRoom = () => {
        let newRoomID = String(Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        router.push(newRoomID);
    }

    useEffect(() => {

        socket.on('connect', () => {
            socket.emit('getRooms')
        });

        socket.on('getAllRooms', (allRooms: Room[])=> {
            setRooms([...rooms, ...allRooms])
        })

        socket.connect();

        return (() => {
            socket.off();
            socket.off('connect');
            socket.off('getAllRooms');
            socket.disconnect();
        })

    }, [])

    useEffect(() => {
        setUsername(sessionStorage.getItem("username") ?? generateGuestName());
    }, [])

    return (
        <>
            <div className='flex flex-col justify-center items-center my-14'>
                <div className='flex justify-between w-9/12 items-center'>   
                    <span className='text-white font-bold text-3xl'>multiplayer</span>
                    
                    <div className='flex'>
                        <span className='flex text-gray-400 items-center'>nickname: &nbsp; </span>
                        <span className='flex mr-1 text-white font-bold items-center'>{username}</span>
                        <ChangeUsernameModal username={username} updateUsername={setUsername}/>
                    </div>
                </div>

                <div className="inline-flex flex-col justify-center items-center rounded-lg w-9/12">                    
                    <div className="flex items-center justify-end w-full">
                        <div className="mt-4 pr-6">
                            <TextInput
                                placeholder="Search..."
                                mb="md"
                                radius='lg'
                                inputSize="small"
                                className="w-28 ml-4"
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>

                    <ScrollArea h={250} className='w-full'>
                        <Table highlightOnHover className='w-full' >
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th className="w-[25%]">Code</Table.Th>
                                    <Table.Th className="w-[25%]">Host</Table.Th>
                                    <Table.Th className="w-[25%]">Players</Table.Th>
                                    <Table.Th className="w-[25%] invisible">Players</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>

                        {rows.length === 0 && (
                            <div className='flex mt-24 justify-center w-full'>
                                No Rooms Found
                            </div>
                        )} 
                    </ScrollArea>
                    
                    <div className='flex justify-start w-full'>
                        <button className ='bg-[#275E9D] hover:bg-[#1C416B] text-white py-2 px-3 my-10 rounded-lg' onClick={createRoom}>Create Room</button>
                    </div>
                </div>
            </div>
        </>
    );
}