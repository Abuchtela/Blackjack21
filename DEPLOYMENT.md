# Deployment Guide for Blackjack21

## Prerequisites

- Node.js 18+
- WalletConnect Project ID ([Get one here](https://cloud.walletconnect.com/))

## Environment Variables

Create a `.env.local` file (for local development) or configure environment variables in your deployment platform:

```bash
# Required
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id_here

# Optional (defaults to localhost:3000)
NEXT_PUBLIC_BASE_URL=https://your-domain.com
ROOT_URL=https://your-domain.com
```

## Deployment on Vercel (Recommended)

1. Fork/clone this repository
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Configure environment variables:
   - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_BASE_URL` (your Vercel URL)
   - `ROOT_URL` (your Vercel URL)
6. Click "Deploy"

## Deployment on Other Platforms

### Netlify

```bash
npm run build
```

Configure build command: `npm run build`
Configure publish directory: `.next`

### Self-Hosted

```bash
npm install
npm run build
npm start
```

The application will run on port 3000 by default.

## Post-Deployment Checklist

- [ ] Update Farcaster Frame URLs in `app/layout.tsx` to your domain
- [ ] Test wallet connection with Base network
- [ ] Verify game functionality (place bet, hit, stand)
- [ ] Test Farcaster Frame integration
- [ ] Verify mobile responsiveness
- [ ] Set up monitoring/analytics if needed

## Troubleshooting

### Wallet Connection Issues

- Ensure `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is set correctly
- Check that you're on a supported network (Base or Base Sepolia)

### Build Failures

- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`

### Frame Not Working

- Verify `NEXT_PUBLIC_BASE_URL` and `ROOT_URL` are set to your production URL
- Check `/api/og` and `/api/frame` endpoints are accessible

## Support

For issues, please open a GitHub issue or reach out on Farcaster.
