import { Card, Suit, Rank, GameState } from '../types/game';

const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function createDeck(): Card[] {
  const deck: Card[] = [];
  
  suits.forEach(suit => {
    ranks.forEach(rank => {
      let value: number;
      if (rank === 'A') {
        value = 11; // Ace starts as 11, can be adjusted to 1
      } else if (['J', 'Q', 'K'].includes(rank)) {
        value = 10;
      } else {
        value = parseInt(rank);
      }
      
      deck.push({ suit, rank, value });
    });
  });
  
  return shuffleDeck(deck);
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function calculateScore(hand: Card[]): number {
  let score = 0;
  let aces = 0;
  
  hand.forEach(card => {
    if (card.rank === 'A') {
      aces++;
      score += 11;
    } else {
      score += card.value;
    }
  });
  
  // Adjust for aces
  while (score > 21 && aces > 0) {
    score -= 10; // Convert ace from 11 to 1
    aces--;
  }
  
  return score;
}

export function dealCard(deck: Card[]): { card: Card; remainingDeck: Card[] } {
  if (deck.length === 0) {
    throw new Error('Deck is empty');
  }
  
  const card = deck[0];
  const remainingDeck = deck.slice(1);
  
  return { card, remainingDeck };
}

export function initializeGame(balance: number = 1000): GameState {
  const deck = createDeck();
  
  return {
    playerHand: [],
    dealerHand: [],
    deck,
    gameStatus: 'betting',
    playerScore: 0,
    dealerScore: 0,
    bet: 0,
    balance,
    message: 'Place your bet to start playing!'
  };
}

export function startNewRound(gameState: GameState, bet: number): GameState {
  if (bet > gameState.balance) {
    return {
      ...gameState,
      message: 'Insufficient balance for this bet!'
    };
  }
  
  let { deck } = gameState;
  
  // Deal initial cards
  const { card: playerCard1, remainingDeck: deck1 } = dealCard(deck);
  const { card: dealerCard1, remainingDeck: deck2 } = dealCard(deck1);
  const { card: playerCard2, remainingDeck: deck3 } = dealCard(deck2);
  const { card: dealerCard2, remainingDeck: deck4 } = dealCard(deck3);
  
  const playerHand = [playerCard1, playerCard2];
  const dealerHand = [dealerCard1, dealerCard2];
  
  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore([dealerCard1]); // Only show first card
  
  let gameStatus: GameState['gameStatus'] = 'playing';
  let result: GameState['result'] | undefined;
  let message = 'Hit or Stand?';
  let newBalance = gameState.balance - bet;
  
  // Check for blackjack
  if (playerScore === 21) {
    const dealerFullScore = calculateScore(dealerHand);
    if (dealerFullScore === 21) {
      result = 'push';
      message = 'Push! Both have blackjack.';
      newBalance = gameState.balance; // Return bet
    } else {
      result = 'blackjack';
      message = 'Blackjack! You win!';
      newBalance = gameState.balance + bet * 1.5; // 3:2 payout
    }
    gameStatus = 'finished';
  }
  
  return {
    ...gameState,
    playerHand,
    dealerHand,
    deck: deck4,
    gameStatus,
    playerScore,
    dealerScore,
    bet,
    balance: newBalance,
    result,
    message
  };
}

export function playerHit(gameState: GameState): GameState {
  if (gameState.gameStatus !== 'playing') {
    return gameState;
  }
  
  const { card, remainingDeck } = dealCard(gameState.deck);
  const newPlayerHand = [...gameState.playerHand, card];
  const newPlayerScore = calculateScore(newPlayerHand);
  
  let gameStatus: GameState['gameStatus'] = 'playing';
  let result: GameState['result'] | undefined;
  let message = 'Hit or Stand?';
  let newBalance = gameState.balance;
  
  if (newPlayerScore > 21) {
    gameStatus = 'finished';
    result = 'lose';
    message = 'Bust! You lose.';
  } else if (newPlayerScore === 21) {
    gameStatus = 'dealer-turn';
    message = '21! Dealer\'s turn.';
  }
  
  return {
    ...gameState,
    playerHand: newPlayerHand,
    deck: remainingDeck,
    gameStatus,
    playerScore: newPlayerScore,
    result,
    message,
    balance: newBalance
  };
}

export function playerStand(gameState: GameState): GameState {
  if (gameState.gameStatus !== 'playing') {
    return gameState;
  }
  
  return {
    ...gameState,
    gameStatus: 'dealer-turn',
    message: 'Dealer\'s turn...'
  };
}

export function dealerPlay(gameState: GameState): GameState {
  if (gameState.gameStatus !== 'dealer-turn') {
    return gameState;
  }
  
  let { dealerHand, deck } = gameState;
  let dealerScore = calculateScore(dealerHand);
  
  // Dealer hits on soft 17
  while (dealerScore < 17) {
    const { card, remainingDeck } = dealCard(deck);
    dealerHand = [...dealerHand, card];
    deck = remainingDeck;
    dealerScore = calculateScore(dealerHand);
  }
  
  const playerScore = gameState.playerScore;
  let result: GameState['result'];
  let message: string;
  let newBalance = gameState.balance;
  
  if (dealerScore > 21) {
    result = 'win';
    message = 'Dealer busts! You win!';
    newBalance = gameState.balance + gameState.bet * 2;
  } else if (dealerScore > playerScore) {
    result = 'lose';
    message = 'Dealer wins.';
  } else if (dealerScore < playerScore) {
    result = 'win';
    message = 'You win!';
    newBalance = gameState.balance + gameState.bet * 2;
  } else {
    result = 'push';
    message = 'Push! It\'s a tie.';
    newBalance = gameState.balance + gameState.bet; // Return bet
  }
  
  return {
    ...gameState,
    dealerHand,
    deck,
    gameStatus: 'finished',
    dealerScore,
    result,
    message,
    balance: newBalance
  };
}