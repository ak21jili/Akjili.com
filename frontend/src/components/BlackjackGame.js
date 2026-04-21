import React, { useState } from 'react';

const BlackjackGame = () => {
    const [deck, setDeck] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [playerBalance, setPlayerBalance] = useState(100);
    const [bet, setBet] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const initializeDeck = () => {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let newDeck = [];

        suits.forEach(suit => {
            ranks.forEach(rank => {
                newDeck.push({ suit, rank });
            });
        });

        // Shuffle the deck
        newDeck = newDeck.sort(() => Math.random() - 0.5);
        setDeck(newDeck);
    };

    const dealInitialCards = () => {
        const playerCards = [deck.pop(), deck.pop()];
        const dealerCards = [deck.pop(), deck.pop()];
        setPlayerHand(playerCards);
        setDealerHand(dealerCards);
        setGameOver(false);
    };

    const calculateHandValue = (hand) => {
        let value = 0;
        let aces = 0;

        hand.forEach(card => {
            if (card.rank === 'A') {
                aces += 1;
                value += 11;
            } else if (['K', 'Q', 'J'].includes(card.rank)) {
                value += 10;
            } else {
                value += parseInt(card.rank);
            }
        });

        while (value > 21 && aces) {
            value -= 10;
            aces -= 1;
        }
        return value;
    };

    const hit = () => {
        if (!gameOver) {
            const newCard = deck.pop();
            setPlayerHand([...playerHand, newCard]);
            if (calculateHandValue([...playerHand, newCard]) > 21) {
                setGameOver(true);
                alert('Busted!');
            }
        }
    };

    const stand = () => {
        setGameOver(true);
        let dealerValue = calculateHandValue(dealerHand);
        while (dealerValue < 17) {
            const newCard = deck.pop();
            setDealerHand([...dealerHand, newCard]);
            dealerValue = calculateHandValue([...dealerHand, newCard]);
        }
        resolveRound();
    };

    const resolveRound = () => {
        const playerValue = calculateHandValue(playerHand);
        const dealerValue = calculateHandValue(dealerHand);

        if (dealerValue > 21 || playerValue > dealerValue) {
            alert('You win!');
            setPlayerBalance(prev => prev + bet);
        } else if (playerValue < dealerValue) {
            alert('Dealer wins!');
            setPlayerBalance(prev => prev - bet);
        } else {
            alert('Push!');
        }
    };

    const startGame = (newBet) => {
        if (newBet > playerBalance) {
            alert('Insufficient balance');
            return;
        }
        setBet(newBet);
        initializeDeck();
        dealInitialCards();
    };

    return (
        <div>
            <h1>Blackjack Game</h1>
            <div>
                <h2>Player Balance: ${playerBalance}</h2>
                <input
                    type="number"
                    value={bet}
                    onChange={(e) => setBet(Number(e.target.value))}
                    placeholder="Enter your bet"
                />
                <button onClick={() => startGame(bet)}>Start Game</button>
            </div>
            <div>
                <h3>Your Hand: {playerHand.map(card => `${card.rank} of ${card.suit}`).join(', ')}</h3>
                <h3>Dealer Hand: {dealerHand.length > 0 ? dealerHand[0].rank + ' of ' + dealerHand[0].suit : ''}</h3>
                <button onClick={hit}>Hit</button>
                <button onClick={stand} disabled={gameOver}>Stand</button>
                {gameOver && <button onClick={() => window.location.reload()}>Reload</button>}
            </div>
        </div>
    );
};

export default BlackjackGame;