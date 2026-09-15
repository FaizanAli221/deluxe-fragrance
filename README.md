# Fragrance Deluxe

A luxury fragrance e-commerce storefront built with Next.js 14 (App Router),
TypeScript, Tailwind CSS, Zustand, and Framer Motion.

## Features

- Home, shop (with gender filter), and product detail pages
- Mock product catalog with notes, tags, pricing, and reviews (`data/products.ts`)
- Route Handler API: `/api/products`, `/api/products/[slug]`, `/api/reviews`, `/api/checkout`
- Cart state (Zustand + localStorage persistence): add/remove/increment/decrement
- Wishlist state (Zustand + localStorage persistence)
- Slide-over cart drawer with a simulated checkout flow
- Fully responsive, mobile-first layout matching the reference design
- Floating WhatsApp contact button

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  layout.tsx            Root layout, fonts, navbar/footer/cart mount
  page.tsx              Homepage
  shop/page.tsx          Shop listing with gender filter
  product/[slug]/page.tsx  Product detail page
  about/page.tsx
  policies/*/page.tsx    Static policy pages
  api/
    products/route.ts
    products/[slug]/route.ts
    reviews/route.ts
    checkout/route.ts
components/
  Navbar.tsx, Hero.tsx, CollectionCards.tsx, TrustBadges.tsx,
  ProductCard.tsx, ProductGrid.tsx, CartDrawer.tsx, CheckoutModal.tsx,
  AddToCartButton.tsx, Reviews.tsx, Footer.tsx, WhatsAppButton.tsx,
  PolicyPage.tsx
store/
  cartStore.ts, wishlistStore.ts
lib/
  format.ts, api.ts
types/
  product.ts
data/
  products.ts
```

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to https://vercel.com/new and import the repository.
3. Framework preset: Next.js (auto-detected). No environment variables are
   required — the product catalog and checkout are fully mocked.
4. Click Deploy.

Alternatively, from the project root with the Vercel CLI installed:

```bash
npm i -g vercel
vercel
```

## Notes

- Product images are sourced from Unsplash for placeholder purposes — swap
  in your own product photography before using this in production.
- `/api/checkout` simulates order placement (no real payment gateway is
  connected). Wire it up to Stripe or a similar provider before going live.
- The WhatsApp button links to a placeholder number — update it in
  `components/WhatsAppButton.tsx`.
