import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('YOUR_SOCKET_SERVER_URL'); // Replace with your Socket.io server URL

const MultiplayerLobby = () => {
    const [players, setPlayers] = useState([]);
    const [room, setRoom] = useState('');

    useEffect(() => {
        socket.on('playerList', (players) => {
            setPlayers(players);
        });

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const createRoom = () => {
        if (room) {
            socket.emit('createRoom', room);
            setRoom('');
        }
    };

    return (
        <div>
            <h2>Multiplayer Lobby</h2>
            <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Enter room name"
            />
            <button onClick={createRoom}>Create Room</button>
            <h3>Players:</h3>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player}</li>
                ))}
            </ul>
        </div>
    );
};

export default MultiplayerLobby;