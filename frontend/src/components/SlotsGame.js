import React, { useState } from 'react';

const SlotsGame = () => {
  const [reels, setReels] = useState(['🍒', '🍋', '🍊']);
  const [bet, setBet] = useState(1);
  const [message, setMessage] = useState('');

  const spinReels = () => {
    const newReels = [
      Math.floor(Math.random() * 3),
      Math.floor(Math.random() * 3),
      Math.floor(Math.random() * 3)
    ];
    setReels(newReels);
    checkWin(newReels);
  };

  const checkWin = (newReels) => {
    if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
      setMessage(`You win! Bet: ${bet}`);
    } else {
      setMessage('Try again!');
    }
  };

  const increaseBet = () => {
    setBet(bet + 1);
  };

  const decreaseBet = () => {
    setBet(bet > 1 ? bet - 1 : 1);
  };

  return (
    <div className="slots-game">
      <h2>Slots Game</h2>
      <div className="reels">{reels.map(index => <span key={index}>{['🍒', '🍋', '🍊'][index]}</span>)}</div>
      <div className="controls">
        <button onClick={spinReels}>Spin</button>
        <div className="bet-controls">
          <button onClick={decreaseBet}>-</button>
          <span>Bet: {bet}</span>
          <button onClick={increaseBet}>+</button>
        </div>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default SlotsGame;