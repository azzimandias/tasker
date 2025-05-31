import { io } from 'socket.io-client';

const socket = io( process.env.VUE_APP_SOCKET_URL, {
    autoConnect: false,
    reconnection: true,
    transports: ['websocket'],
    withCredentials: true,
    rejectUnauthorized: false
});

export default socket;
