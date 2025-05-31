import { io } from 'socket.io-client';

const socket = io( process.env.VUE_APP_SOCKET_URL, {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ['websocket'],
    withCredentials: true
});

export default socket;
