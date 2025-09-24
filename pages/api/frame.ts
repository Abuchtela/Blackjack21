import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse the frame action
  const { untrustedData } = req.body;
  const buttonIndex = untrustedData?.buttonIndex;

  let response;

  if (buttonIndex === 1) {
    // Start game button pressed
    response = {
      image: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og?action=game`,
      buttons: [
        { label: 'Hit', action: 'post' },
        { label: 'Stand', action: 'post' },
        { label: 'New Game', action: 'post' },
      ],
      post_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame`,
    };
  } else if (buttonIndex === 2) {
    // Hit button
    response = {
      image: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og?action=hit`,
      buttons: [
        { label: 'Hit', action: 'post' },
        { label: 'Stand', action: 'post' },
        { label: 'New Game', action: 'post' },
      ],
      post_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame`,
    };
  } else if (buttonIndex === 3) {
    // Stand button
    response = {
      image: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og?action=stand`,
      buttons: [
        { label: 'New Game', action: 'post' },
        { label: 'Play Again', action: 'post' },
      ],
      post_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame`,
    };
  } else {
    // Default/New game
    response = {
      image: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og?action=start`,
      buttons: [
        { label: 'Place Bet & Deal', action: 'post' },
      ],
      post_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame`,
    };
  }

  // Return Frame response
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${response.image}" />
        ${response.buttons.map((button, index) =>
          `<meta property="fc:frame:button:${index + 1}" content="${button.label}" />`
        ).join('\n        ')}
        <meta property="fc:frame:post_url" content="${response.post_url}" />
        <meta property="og:image" content="${response.image}" />
        <title>Blackjack21 Frame</title>
      </head>
      <body>
        <h1>Blackjack21 - Play on Base</h1>
        <p>A Blackjack card game with Base wallet integration</p>
      </body>
    </html>
  `);
}