import { Text, Paper, Button } from "@mantine/core";
import { useRouter } from 'next/navigation'

interface JoinRoomErrorProps {
    message: string
}

export default function JoinRoomError({message} : JoinRoomErrorProps) {

    const router = useRouter();

    return (
        <Paper radius='lg' className="bg-gray-accent mt-8" p='xl'>
            <Text>{message}</Text>
            <div className="mt-8 flex justify-center">
                <Button onClick ={() => {router.push('/multiplayer')}} >Browse Rooms</Button>
            </div>
        </Paper>
    );
}