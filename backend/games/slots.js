// slots.js

class SlotMachine {
    constructor(reels, paylines) {
        this.reels = reels; // Array of reels
        this.paylines = paylines; // Array of paylines
        this.symbols = ['🍒', '🍋', '🍊', '🍉', '🍇', '⭐']; // Slot symbols
    }

    spin() {
        return this.reels.map(reel => {
            const randomIndex = Math.floor(Math.random() * this.symbols.length);
            return this.symbols[randomIndex];
        });
    }

    calculatePayout(result, bet) {
        let payoutMultiplier = 0;
        // Simple payout logic: check for matches on paylines
        this.paylines.forEach(payline => {
            const symbolsOnPayline = payline.map(index => result[index]);
            if (this.allEqual(symbolsOnPayline)) {
                payoutMultiplier += this.getPayoutMultiplier(symbolsOnPayline[0]);
            }
        });
        return bet * payoutMultiplier;
    }

    allEqual(array) {
        return array.every(v => v === array[0]);
    }

    getPayoutMultiplier(symbol) {
        const payouts = {
            '🍒': 2,
            '🍋': 3,
            '🍊': 4,
            '🍉': 5,
            '🍇': 10,
            '⭐': 50,
        };
        return payouts[symbol] || 0;
    }
}

// Example usage
const reels = [0, 1, 2]; // Indexes for positions on the reels
const paylines = [
    [0, 1, 2], // Payline 1
];
const slotMachine = new SlotMachine(reels, paylines);
const bet = 1;
const result = slotMachine.spin();
const payout = slotMachine.calculatePayout(result, bet);
console.log('Spin Result:', result);
console.log('Payout:', payout);