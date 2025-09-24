'use client';

import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card } from './Card';
import { GameState } from '../types/game';
import { 
  initializeGame, 
  startNewRound, 
  playerHit, 
  playerStand, 
  dealerPlay 
} from '../lib/gameLogic';

export function BlackjackGame() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  
  const [gameState, setGameState] = useState<GameState>(() => initializeGame());
  const [betAmount, setBetAmount] = useState(10);
  const [isDealing, setIsDealing] = useState(false);

  // Auto-play dealer when it's dealer's turn
  useEffect(() => {
    if (gameState.gameStatus === 'dealer-turn') {
      const timer = setTimeout(() => {
        setGameState(dealerPlay(gameState));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState.gameStatus]);

  const handlePlaceBet = () => {
    if (betAmount > 0) {
      setIsDealing(true);
      setTimeout(() => {
        setGameState(startNewRound(gameState, betAmount));
        setIsDealing(false);
      }, 500);
    }
  };

  const handleHit = () => {
    setGameState(playerHit(gameState));
  };

  const handleStand = () => {
    setGameState(playerStand(gameState));
  };

  const handleNewGame = () => {
    setGameState(initializeGame(gameState.balance));
  };

  const betAmounts = [5, 10, 25, 50, 100];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Blackjack21
          </h1>
          <p className="text-base-gray mb-4">
            Play Blackjack on Base Network
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>

        {/* Game Stats */}
        <div className="bg-base-dark/50 rounded-lg p-4 mb-6 flex justify-between items-center">
          <div className="text-white">
            <span className="text-base-gray">Balance: </span>
            <span className="font-bold text-base-green">{gameState.balance} chips</span>
          </div>
          {gameState.bet > 0 && (
            <div className="text-white">
              <span className="text-base-gray">Current Bet: </span>
              <span className="font-bold text-yellow-400">{gameState.bet} chips</span>
            </div>
          )}
          {isConnected && balance && (
            <div className="text-white">
              <span className="text-base-gray">Wallet: </span>
              <span className="font-bold text-base-blue">
                {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
              </span>
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="bg-green-800 rounded-lg p-6 mb-6">
          {/* Dealer Hand */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <h3 className="text-white text-xl font-semibold mr-4">
                Dealer
              </h3>
              <span className="text-base-gray">
                Score: {gameState.gameStatus === 'playing' ? '?' : gameState.dealerScore}
              </span>
            </div>
            <div className="flex space-x-2">
              {gameState.dealerHand.map((card, index) => (
                <Card 
                  key={`dealer-${index}`}
                  card={card}
                  hidden={index === 1 && gameState.gameStatus === 'playing'}
                />
              ))}
            </div>
          </div>

          {/* Player Hand */}
          <div>
            <div className="flex items-center mb-4">
              <h3 className="text-white text-xl font-semibold mr-4">
                Player
              </h3>
              <span className="text-base-gray">
                Score: {gameState.playerScore}
              </span>
            </div>
            <div className="flex space-x-2">
              {gameState.playerHand.map((card, index) => (
                <Card 
                  key={`player-${index}`}
                  card={card}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Game Message */}
        <div className="text-center mb-6">
          <p className="text-xl text-white font-semibold">
            {gameState.message}
          </p>
          {gameState.result && (
            <div className="mt-2">
              <span className={`text-2xl font-bold ${
                gameState.result === 'win' || gameState.result === 'blackjack' 
                  ? 'text-base-green' 
                  : gameState.result === 'lose' 
                    ? 'text-base-red' 
                    : 'text-yellow-400'
              }`}>
                {gameState.result === 'win' && '🎉 You Win!'}
                {gameState.result === 'lose' && '😞 You Lose!'}
                {gameState.result === 'push' && '🤝 Push!'}
                {gameState.result === 'blackjack' && '🃏 Blackjack!'}
              </span>
            </div>
          )}
        </div>

        {/* Game Controls */}
        <div className="text-center">
          {gameState.gameStatus === 'betting' && (
            <div className="space-y-4">
              <div className="flex justify-center space-x-2">
                {betAmounts.map(amount => (
                  <button
                    key={amount}
                    onClick={() => setBetAmount(amount)}
                    className={`game-button ${
                      betAmount === amount ? 'primary' : 'secondary'
                    }`}
                    disabled={amount > gameState.balance}
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <button
                onClick={handlePlaceBet}
                disabled={betAmount > gameState.balance || isDealing}
                className="game-button success text-lg px-8 py-4"
              >
                {isDealing ? 'Dealing...' : `Place Bet (${betAmount} chips)`}
              </button>
            </div>
          )}

          {gameState.gameStatus === 'playing' && (
            <div className="space-x-4">
              <button
                onClick={handleHit}
                className="game-button primary text-lg px-8 py-4"
              >
                Hit
              </button>
              <button
                onClick={handleStand}
                className="game-button secondary text-lg px-8 py-4"
              >
                Stand
              </button>
            </div>
          )}

          {gameState.gameStatus === 'finished' && (
            <button
              onClick={handleNewGame}
              className="game-button primary text-lg px-8 py-4"
            >
              New Game
            </button>
          )}
        </div>

        {/* Game Rules */}
        <div className="mt-12 bg-base-dark/30 rounded-lg p-6">
          <h3 className="text-white text-xl font-semibold mb-4">How to Play</h3>
          <div className="text-base-gray space-y-2">
            <p>• Try to get as close to 21 as possible without going over</p>
            <p>• Face cards (J, Q, K) are worth 10 points</p>
            <p>• Aces are worth 11 or 1 (whichever is better)</p>
            <p>• Dealer must hit on 16 and stand on 17</p>
            <p>• Blackjack (21 with first 2 cards) pays 3:2</p>
            <p>• Connect your Base wallet to earn rewards!</p>
          </div>
        </div>
      </div>
    </div>
  );
}