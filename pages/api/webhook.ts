import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Log webhook received (without exposing sensitive data)
  console.log('Webhook received at:', new Date().toISOString());
  
  // In production, you would process the webhook payload here
  // and perform any necessary actions (e.g., update user state, process transactions)

  // Acknowledge receipt of the webhook
  res.status(200).json({ 
    success: true,
    message: 'Webhook received successfully'
  });
}
