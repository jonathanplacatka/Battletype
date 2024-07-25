"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { Button, Table, TextInput, Title } from '@mantine/core';
import socket from '@/scripts/SocketConnection';

interface Room {
    roomID: string;
    players: object;
    roomHost: string;
}
  
export default function Multiplayer() {

    const router = useRouter();

    const [rooms, setRooms] = useState<Room[]>([]);
    const [search, setSearch] = useState('');
    const [filteredRooms, setFilteredRooms] = useState<Room[]>();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        //TODO: Maybe implement a better search function?? Kinda trash/wonky
        const { value } = event.currentTarget;
        setSearch(value);

        if (search.length != 0) {
            const filtered = rooms.filter((room) =>
                room.roomID.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredRooms(filtered);
        } 
    };

    useEffect(() => {
        setFilteredRooms(rooms)
    }, [rooms])

    const rows = filteredRooms?.map((element) => {
        return (
            <Table.Tr key={element.roomID}>
                <Table.Td className="pl-0 w-12">{element.roomID}</Table.Td>
                <Table.Td className="pl-14" style={{ textAlign: 'left' }}>{Object.keys(element.players).length} / 4</Table.Td>
                <Table.Td className="pl-8" > 
                    <Button variant="outline" color="gray" radius="md" onClick={() => joinRoom(element.roomID)}>Join</Button>
                </Table.Td>
            </Table.Tr>
        );
    });

    const joinRoom = (roomID : string) => {
        router.push(roomID)
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

    return (
        <div className='flex flex-col justify-center items-center my-10'>
            <div className="inline-flex flex-col justify-center items-center rounded-lg bg-[#191919] p-6 mt-8 min-w-96">
                <div className="flex flex-col justify-center items-center w-full my-2">
                    <div className="flex flex-col">
                        
                        <div className="flex items-center justify-between w-full">
                            <Title order={3} className="my-1">Rooms</Title>
                            <div className="mt-4">
                                <TextInput
                                placeholder="Room ID..."
                                mb="md"
                                radius='lg'
                                inputSize="small"
                                className="w-28 ml-4"
                                value={search}
                                onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        <Table highlightOnHover className='w-72' >
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th className="pl-0">Code</Table.Th>
                                    <Table.Th className="pl-14">Players</Table.Th>
                                    <Table.Th className="pl-14 invisible" >Players</Table.Th>  {/* Stupid hack to make the header fixed in position when the filter returns 0 results*/}
                                </Table.Tr>
                            </Table.Thead>
                           <Table.Tbody className='min-h-24'>
                            {rows && rows.length > 0 ? (
                                    rows
                                ) : (
                                    <Table.Tr>
                                        <Table.Td className="pl-0" colSpan={2} style={{ visibility: 'hidden' }}>
                                            No data
                                        </Table.Td>
                                    </Table.Tr>
                                )}
                           </Table.Tbody>
                        </Table>
                    </div>
                </div>
            
                <div className="">
                    <div className='flex flex-col p-3 mx-4'>
                        <button className ='btntext bg-[#2C2C2C] hover:bg-blue-700 text-white py-2 px-3 mx-5 my-4 rounded-lg' onClick={createRoom}>Create Room</button>
                    </div>
                </div>
            </div>
        </div>
    );
}