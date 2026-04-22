# VentiPure Website

Public website for **VentiPure** (Quebec ventilation cleaning), built to present services and convert visitors into quote requests.

- Live site: [ventipure.ca](https://ventipure.ca/)
- Primary language: French
- Main audience: residential clients + light commercial clients in Greater Montreal

## What This Website Includes

- Service overview pages (`/services`, `/tarifs`, `/equipement`)
- Service-area page (`/nos-services-et-secteurs`)
- Quote-request flow (`/contact`) with service preselection via URL params
- Contact form backend via Netlify Functions
- Route-level SEO metadata and structured data

## Tech Stack

- React 18 + TypeScript + Vite
- React Router
- Tailwind CSS + Radix UI
- Framer Motion
- Netlify Functions (form submission handling)

## Local Development

Requirements:

- Node.js `>= 20.19.0`

Install and run:

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run preview
npm run lint
npm run test
```

## Environment Variables

For contact form delivery through Telegram (Netlify function):

- `TELEGRAM_CHANNEL_ID`
- `TELEGRAM_BOT_KEY`

## Deployment

This project is configured for Netlify:

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`
- Redirects:
  - `/api/*` -> `/.netlify/functions/:splat`
  - SPA fallback to `/index.html`
