import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { action = 'start' } = req.query;

  // Generate SVG image based on action
  let svgContent;

  switch (action) {
    case 'start':
      svgContent = generateStartImage();
      break;
    case 'game':
      svgContent = generateGameImage();
      break;
    case 'hit':
      svgContent = generateHitImage();
      break;
    case 'stand':
      svgContent = generateStandImage();
      break;
    default:
      svgContent = generateStartImage();
  }

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, s-maxage=60');
  res.status(200).send(svgContent);
}

function generateStartImage() {
  return `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1A1A1A"/>
          <stop offset="100%" style="stop-color:#000000"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- Base logo styled elements -->
      <circle cx="600" cy="200" r="80" fill="#0052FF" opacity="0.8"/>
      <circle cx="600" cy="200" r="60" fill="none" stroke="#FFFFFF" stroke-width="3"/>
      
      <!-- Title -->
      <text x="600" y="320" font-family="Arial, sans-serif" font-size="64" font-weight="bold" 
            text-anchor="middle" fill="#FFFFFF">Blackjack21</text>
      
      <!-- Subtitle -->
      <text x="600" y="380" font-family="Arial, sans-serif" font-size="28" 
            text-anchor="middle" fill="#8A8A8A">Play on Base Network</text>
      
      <!-- Cards decoration -->
      <rect x="450" y="450" width="60" height="84" rx="8" fill="#FFFFFF" stroke="#DDD" stroke-width="2"/>
      <text x="480" y="475" font-family="Arial, sans-serif" font-size="16" font-weight="bold" 
            text-anchor="middle" fill="#FF0000">A♥</text>
      
      <rect x="530" y="450" width="60" height="84" rx="8" fill="#FFFFFF" stroke="#DDD" stroke-width="2"/>
      <text x="560" y="475" font-family="Arial, sans-serif" font-size="16" font-weight="bold" 
            text-anchor="middle" fill="#000000">K♠</text>
      
      <rect x="610" y="450" width="60" height="84" rx="8" fill="#FFFFFF" stroke="#DDD" stroke-width="2"/>
      <text x="640" y="475" font-family="Arial, sans-serif" font-size="16" font-weight="bold" 
            text-anchor="middle" fill="#FF0000">Q♦</text>
      
      <rect x="690" y="450" width="60" height="84" rx="8" fill="#FFFFFF" stroke="#DDD" stroke-width="2"/>
      <text x="720" y="475" font-family="Arial, sans-serif" font-size="16" font-weight="bold" 
            text-anchor="middle" fill="#000000">J♣</text>
      
      <!-- Call to action -->
      <text x="600" y="580" font-family="Arial, sans-serif" font-size="24" 
            text-anchor="middle" fill="#00D632">Click to Start Playing!</text>
    </svg>
  `;
}

function generateGameImage() {
  return `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1A1A1A"/>
          <stop offset="100%" style="stop-color:#000000"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- Game table -->
      <ellipse cx="600" cy="315" rx="500" ry="250" fill="#0F5132" opacity="0.8"/>
      <ellipse cx="600" cy="315" rx="480" ry="230" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.3"/>
      
      <!-- Title -->
      <text x="600" y="60" font-family="Arial, sans-serif" font-size="42" font-weight="bold" 
            text-anchor="middle" fill="#FFFFFF">Blackjack21 - Game in Progress</text>
      
      <!-- Dealer section -->
      <text x="400" y="150" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
            fill="#FFFFFF">Dealer</text>
      
      <!-- Dealer cards -->
      <rect x="450" y="160" width="50" height="70" rx="6" fill="#FFFFFF"/>
      <text x="475" y="185" font-family="Arial, sans-serif" font-size="14" font-weight="bold" 
            text-anchor="middle" fill="#000000">10♠</text>
      
      <rect x="510" y="160" width="50" height="70" rx="6" fill="#0052FF"/>
      <text x="535" y="200" font-family="Arial, sans-serif" font-size="20" font-weight="bold" 
            text-anchor="middle" fill="#FFFFFF">?</text>
      
      <!-- Player section -->
      <text x="400" y="400" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
            fill="#FFFFFF">Player - Score: 15</text>
      
      <!-- Player cards -->
      <rect x="450" y="410" width="50" height="70" rx="6" fill="#FFFFFF"/>
      <text x="475" y="435" font-family="Arial, sans-serif" font-size="14" font-weight="bold" 
            text-anchor="middle" fill="#FF0000">7♥</text>
      
      <rect x="510" y="410" width="50" height="70" rx="6" fill="#FFFFFF"/>
      <text x="535" y="435" font-family="Arial, sans-serif" font-size="14" font-weight="bold" 
            text-anchor="middle" fill="#000000">8♣</text>
      
      <!-- Game info -->
      <text x="600" y="550" font-family="Arial, sans-serif" font-size="28" 
            text-anchor="middle" fill="#00D632">Hit or Stand?</text>
      
      <!-- Bet info -->
      <text x="750" y="180" font-family="Arial, sans-serif" font-size="20" 
            fill="#FFD23F">Bet: 10 chips</text>
      <text x="750" y="210" font-family="Arial, sans-serif" font-size="20" 
            fill="#00D632">Balance: 990 chips</text>
    </svg>
  `;
}

function generateHitImage() {
  return `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1A1A1A"/>
          <stop offset="100%" style="stop-color:#000000"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- Game table -->
      <ellipse cx="600" cy="315" rx="500" ry="250" fill="#0F5132" opacity="0.8"/>
      
      <!-- Title -->
      <text x="600" y="60" font-family="Arial, sans-serif" font-size="42" font-weight="bold" 
            text-anchor="middle" fill="#FFFFFF">You Hit!</text>
      
      <!-- New card animation effect -->
      <rect x="570" y="410" width="50" height="70" rx="6" fill="#FFFFFF" stroke="#00D632" stroke-width="3"/>
      <text x="595" y="435" font-family="Arial, sans-serif" font-size="14" font-weight="bold" 
            text-anchor="middle" fill="#FF0000">6♦</text>
      
      <!-- Player score update -->
      <text x="600" y="550" font-family="Arial, sans-serif" font-size="32" font-weight="bold" 
            text-anchor="middle" fill="#FFFFFF">New Score: 21!</text>
      
      <text x="600" y="590" font-family="Arial, sans-serif" font-size="24" 
            text-anchor="middle" fill="#00D632">Perfect! Dealer's turn...</text>
    </svg>
  `;
}

function generateStandImage() {
  return `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1A1A1A"/>
          <stop offset="100%" style="stop-color:#000000"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- Title -->
      <text x="600" y="80" font-family="Arial, sans-serif" font-size="48" font-weight="bold" 
            text-anchor="middle" fill="#FFFFFF">🎉 You Win!</text>
      
      <!-- Final scores -->
      <text x="300" y="200" font-family="Arial, sans-serif" font-size="32" font-weight="bold" 
            fill="#FFFFFF">Dealer: 22 (Bust!)</text>
      <text x="300" y="250" font-family="Arial, sans-serif" font-size="32" font-weight="bold" 
            fill="#FFFFFF">Player: 20</text>
      
      <!-- Winnings -->
      <text x="600" y="350" font-family="Arial, sans-serif" font-size="36" font-weight="bold" 
            text-anchor="middle" fill="#00D632">You won 20 chips!</text>
      
      <!-- New balance -->
      <text x="600" y="420" font-family="Arial, sans-serif" font-size="28" 
            text-anchor="middle" fill="#FFD23F">New Balance: 1010 chips</text>
      
      <!-- Play again prompt -->
      <text x="600" y="520" font-family="Arial, sans-serif" font-size="32" 
            text-anchor="middle" fill="#0052FF">Ready for another round?</text>
      
      <!-- Celebration elements -->
      <text x="150" y="150" font-family="Arial, sans-serif" font-size="40">🎊</text>
      <text x="1050" y="150" font-family="Arial, sans-serif" font-size="40">🎊</text>
      <text x="100" y="500" font-family="Arial, sans-serif" font-size="40">💎</text>
      <text x="1100" y="500" font-family="Arial, sans-serif" font-size="40">💎</text>
    </svg>
  `;
}