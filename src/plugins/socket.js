import { io } from 'socket.io-client';

const socket = io(process.env.SOCKET, {
    autoConnect: false,
});

export default socket;