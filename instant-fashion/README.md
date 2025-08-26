# Instant Fashion — Next.js 14

Gen Z focused instant fashion delivery app. Next.js 14 + TypeScript + Tailwind + NextAuth + Prisma + Stripe/Twilio/SendGrid/Sheets.

## Getting Started

1. Copy `.env.example` to `.env.local` and fill values
2. Install deps and run dev

```bash
pnpm install
pnpm dev
```

## Deploy on Vercel

- Set all env vars in Vercel Project Settings
- Add `DATABASE_URL` (Postgres), NextAuth secrets, OAuth, Stripe/Twilio/SendGrid
- Add `GOOGLE_PRIVATE_KEY` with quotes
- Run `pnpm build`