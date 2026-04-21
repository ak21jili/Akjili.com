import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
  const [socket, setSocket] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('playerJoined', (data) => {
      setPlayers(data.players);
    });

    return () => newSocket.close();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Akjili Casino</h1>
        <p>Multiplayer Casino Games Platform</p>
      </header>
      <main>
        <section className="games">
          <h2>Available Games</h2>
          <div className="game-list">
            <div className="game-card">Slots</div>
            <div className="game-card">Blackjack</div>
            <div className="game-card">Roulette</div>
            <div className="game-card">Poker</div>
          </div>
        </section>
        <section className="players">
          <h2>Active Players: {players.length}</h2>
        </section>
      </main>
    </div>
  );
}

export default App;