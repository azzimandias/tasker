import { io } from 'socket.io-client';

const socket = io( process.env.VUE_APP_SOCKET_URL, {
    autoConnect: false,
    reconnection: false,
    withCredentials: true,
});

export default socket;