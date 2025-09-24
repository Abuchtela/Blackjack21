export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  suit: Suit;
  rank: Rank;
  value: number;
}

export interface GameState {
  playerHand: Card[];
  dealerHand: Card[];
  deck: Card[];
  gameStatus: 'betting' | 'playing' | 'dealer-turn' | 'finished';
  playerScore: number;
  dealerScore: number;
  bet: number;
  balance: number;
  result?: 'win' | 'lose' | 'push' | 'blackjack';
  message: string;
}

export interface WalletState {
  address?: string;
  isConnected: boolean;
  balance?: string;
  chainId?: number;
}