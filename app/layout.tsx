import type { Metadata } from 'next'
import './globals.css'
import { WalletProvider } from '../components/WalletProvider'

export const metadata: Metadata = {
  title: 'Blackjack21 - Play on Base Network',
  description: 'Classic Blackjack21 game. Bet tokens, play hands, and experience casino-style gameplay with neon blue theme on Base network.',
  openGraph: {
    title: 'baseblackjack21',
    description: 'Play casino-style Blackjack21 with tokens and wallet on Base. Neon blue theme, Farcaster-ready.',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og`,
    'fc:frame:button:1': 'Play Blackjack',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <WalletProvider>
          <div className="min-h-screen bg-gradient-to-b from-base-dark to-black">
            {children}
          </div>
        </WalletProvider>
      </body>
    </html>
  )
}