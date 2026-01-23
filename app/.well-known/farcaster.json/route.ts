import { NextResponse } from 'next/server';

export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: ""
  },
  miniapp: {
    version: "1",
    name: "baseblackjack21",
    subtitle: "",
    description: "Classic Blackjack21 game. Bet tokens, play hands, and experience casino-style gameplay with neon blue theme on Base network.",
    screenshotUrls: [`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/screenshot-portrait.png`],
    iconUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blue-icon.png`,
    splashImageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blue-hero.png`,
    splashBackgroundColor: "#0052FF",
    homeUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    webhookUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/webhook`,
    primaryCategory: "gaming",
    tags: ["blackjack", "casino", "base", "tokens", "wallet", "farcaster"],
    heroImageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blue-hero.png`,
    tagline: "Bet, Play, Win!",
    ogTitle: "baseblackjack21",
    ogDescription: "Play casino-style Blackjack21 with tokens and wallet on Base. Neon blue theme, Farcaster-ready.",
    ogImageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blue-hero.png`,
  },
  baseBuilder: {
    allowedAddresses: ["0x3E3b9053af3132c2fD7a9dEF68f3b8d4BE92eD58"]
  }
} as const;

export async function GET() {
  return NextResponse.json(minikitConfig);
}
