import { Card as CardType } from '../types/game';

interface CardProps {
  card?: CardType;
  hidden?: boolean;
  className?: string;
}

const suitSymbols = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠'
};

export function Card({ card, hidden = false, className = '' }: CardProps) {
  if (hidden || !card) {
    return (
      <div className={`card card-back ${className}`}>
        <div className="text-center text-sm font-bold">
          ?
        </div>
      </div>
    );
  }

  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
  const suitSymbol = suitSymbols[card.suit];

  return (
    <div className={`card ${isRed ? 'red' : 'black'} ${className}`}>
      <div className="text-xs self-start">
        {card.rank}
        <div className="text-lg leading-none">{suitSymbol}</div>
      </div>
      <div className="text-2xl font-bold">
        {suitSymbol}
      </div>
      <div className="text-xs self-end transform rotate-180">
        {card.rank}
        <div className="text-lg leading-none">{suitSymbol}</div>
      </div>
    </div>
  );
}