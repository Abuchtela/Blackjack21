# Blackjack21 🃏

A fully-featured Blackjack card game built for Base Network with Farcaster Frame integration.

## Features ✨

- **Full Blackjack Game Logic**: Complete card game with proper scoring, dealer AI, and betting system
- **Base Network Integration**: Connect your Base wallet using Coinbase Wallet SDK and RainbowKit
- **Farcaster Frame Support**: Play directly in Farcaster with interactive frames
- **Base Theme**: Beautiful UI styled with Base's official color palette
- **Responsive Design**: Works on both desktop and mobile devices
- **Real-time Gameplay**: Smooth animations and instant feedback

## Screenshots 📸

### Game Interface
![Blackjack21 Interface](https://github.com/user-attachments/assets/33c36ba7-203a-493a-a0f8-e3d6a1a2243d)

### Game in Progress
![Game in Progress](https://github.com/user-attachments/assets/9d092911-8b03-4fcd-8637-649b72c4c963)

## Tech Stack 🛠️

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with Base theme colors
- **Wallet Integration**: Coinbase Wallet SDK, RainbowKit, Wagmi
- **Blockchain**: Base Network (Mainnet & Testnet)
- **Frame Integration**: Farcaster Frame API v2
- **Image Generation**: Dynamic SVG generation for Frame images

## Getting Started 🚀

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Abuchtela/Blackjack21.git
cd Blackjack21
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Add your WalletConnect Project ID to `.env.local`:
```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production
```bash
npm run build
npm start
```

## How to Play 🎮

1. **Connect Wallet**: Click "Connect Wallet" to connect your Base wallet
2. **Place Bet**: Choose your bet amount (5-100 chips) and click "Place Bet"
3. **Play Hand**: Use "Hit" to draw cards or "Stand" to end your turn
4. **Win/Lose**: Beat the dealer to win 2x your bet, or get Blackjack for 3:2 payout!

### Game Rules
- Get as close to 21 as possible without going over
- Face cards (J, Q, K) are worth 10 points
- Aces are worth 11 or 1 (whichever is better)
- Dealer must hit on 16 and stand on 17
- Blackjack (21 with first 2 cards) pays 3:2

## Farcaster Frame Integration 🖼️

The game includes full Farcaster Frame support with:
- Interactive game buttons
- Dynamic SVG image generation
- Real-time game state updates
- Base network branding

### Frame Endpoints
- `POST /api/frame` - Handle frame interactions
- `GET /api/og` - Generate frame images

## Deployment 🌐

### Vercel (Recommended)
1. Fork this repository
2. Connect to Vercel
3. Add environment variables
4. Deploy!

### Other Platforms
The app is a standard Next.js application and can be deployed to any platform that supports Node.js.

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License 📄

MIT License - see LICENSE file for details

## Support 💬

For support, please open an issue on GitHub or reach out on Farcaster.
