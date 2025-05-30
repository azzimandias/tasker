import { io } from 'socket.io-client';

const socket = io( process.env.VUE_APP_SOCKET_URL, {
    autoConnect: false,
});

export default socket;