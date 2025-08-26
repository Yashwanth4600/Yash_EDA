# Instant Fashion

Your Style, Delivered in 15 Minutes. Next.js 14 + TypeScript + Tailwind.

## Getting Started

1. Copy `.env.example` to `.env.local` and fill values.
2. Install deps: `npm install`
3. Set up DB: `npx prisma migrate dev --name init`
4. Run dev server: `npm run dev`

## Tech
- Next.js App Router, TypeScript, Tailwind, Framer Motion
- Auth: NextAuth (Google + Credentials)
- DB: Prisma + Postgres
- Payments: Stripe/Razorpay
- Maps: Leaflet
- Notifications: SendGrid/Nodemailer + Twilio
- Google Sheets logging

## Deploy on Vercel
- Add env vars in Vercel project settings
- Set `DATABASE_URL`
- Add NextAuth secret and OAuth creds
- Configure Stripe/Razorpay webhooks

## Routes
- `/` Landing
- `/login`, `/signup`
- `/settings`
- `/orders`
- `/admin`

## License
MIT