import { io } from 'socket.io-client';

const PRODMODE: boolean = !(['localhost', '127.0.0.1', '0.0.0.0', ''].includes(window.location.hostname));

const socket = io( (PRODMODE ? import.meta.env.VUE_APP_SOCKET_URL_PROD : import.meta.env.VUE_APP_SOCKET_URL), {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ['websocket'],
    withCredentials: true,
    rejectUnauthorized: false
});

export default socket;
