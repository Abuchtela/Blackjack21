import type { Metadata } from 'next'
import './globals.css'
import { WalletProvider } from '../components/WalletProvider'

export const metadata: Metadata = {
  title: 'Blackjack21 - Play on Base',
  description: 'A Blackjack card game with Base wallet integration and Farcaster Frame support',
  openGraph: {
    title: 'Blackjack21',
    description: 'A Blackjack card game with Base wallet integration',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://your-domain.com/api/og',
    'fc:frame:button:1': 'Play Blackjack',
    'fc:frame:post_url': 'https://your-domain.com/api/frame',
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