import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', { // URL вашего Node.js-сервера
    autoConnect: false, // Отключаем автоподключение (можно включить)
});

export default socket;