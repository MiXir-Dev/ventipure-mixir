# VentiPure Website

Public website for **VentiPure**, a Quebec ventilation-cleaning company focused on residential and light commercial lead generation.

- Live site: [ventipure.ca](https://ventipure.ca/)
- Primary language: French
- Main audience: residential clients + light commercial clients in Greater Montreal

## Company Public Information

- Business name: **VentiPure**
- Website: [ventipure.ca](https://ventipure.ca/)
- Phone: **438-995-2291**
- Email: **info@ventipure.ca**
- Address: **2151, rue Leonardo da Vinci, Sainte-Julie, Québec J3E 1Z3**
- Main service territory: Greater Montreal and surrounding areas

### Core Services

- Nettoyage des conduits de fournaise (from **349 $**)
- Nettoyage du conduit de sécheuse (**149 $**)
- Nettoyage de l'échangeur d'air (**249 $**)
- Nettoyage de climatiseur mural (**249 $**)
- Nettoyage de conduits commerciaux (on estimate)

### Featured Offer

- Best-seller combo: **fournaise + sécheuse**
- Public discount shown on site: **20 $** off

### Service Areas Highlighted on the Site

- Montréal
- Longueuil et alentours (ex: Brossard, Saint-Hubert, Boucherville)
- Laval et alentours (ex: Chomedey, Sainte-Rose, Vimont)
- Repentigny et alentours (ex: L'Assomption, Le Gardeur, Terrebonne)

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

## Deployment

This project is configured for Netlify:

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`
- Redirects:
  - `/api/*` -> `/.netlify/functions/:splat`
  - SPA fallback to `/index.html`
