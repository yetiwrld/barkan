# BARBAKAN — Project State (2026-09-26 Final Audit)

## PROJECT
- Objective: Premium Barbakan Delicatessen & Bakery website + ordering platform with shareable /order URL
- Architecture: Nuxt 4.5.2, Vue 3.5, Nitro, TypeScript, file-based routing, JSON file DB (data/barbakan.json)
- Design: Custom CSS design system app/assets/css/main.css — cream #FFF9F2, burgundy #8B1A1A, gold #C8951A, dark #1A1209, Playfair Display + DM Sans, pill buttons, editorial spacing, premium shadows
- Hosting: Nitro node-server preset, ready for deployment

## COMPLETED
- [x] Project inspected, audited, P0 security fixed
- [x] Design system rewritten (clean, formatted, complete)
- [x] Layout default.vue premium rebuilt: sticky header with blur, mobile toggle, cart drawer slide-over, footer grid
- [x] Homepage premium rebuilt: 8 sections — hero dark with meta cards, intro stats strip, awards marquee, story with quote, bakery product cards, deli features + pillars, Saturday pan dark, menu tabs (breakfast/sizzlers/cakes/drinks), catering enquiry form, locations with map placeholders
- [x] Product catalog fixed: 20 real Barbakan products — breads (German Norlander award winner, 48h sourdough, Contadina, Polish Rye), bagels (sesame, everything), pastries (almond croissant, pain au choc, Danish), sizzlers (classic, German sausage, chicken bacon, veg), soups, deli (cheese selection, charcuterie, olives), cakes, drinks — prices in £, badge system
- [x] Ordering platform /order rebuilt: category tabs pill, product list with images, cart drawer, collection info, responsive 2→1 column
- [x] Product detail /order/[id] rebuilt: media + info grid, qty selector, add to cart, collection info, related products
- [x] Checkout /order/checkout created: collection details form with validation, account optional, order summary sticky, total calc, persists guest info to localStorage, server-side price recalc
- [x] Confirmation /order/confirmation/[id] created: thank you, order number, status, items, collection details, actions
- [x] Auth pages rebuilt: login + register with validation, loading states, redirect param, guest checkout option
- [x] Account page rebuilt: sidebar with avatar, orders list filtered by user, view details, logout
- [x] Composables fixed: useAuth with localStorage + cookie persistence, useCart with localStorage, init plugin
- [x] Backend security fixed: orders GET returns [] without auth, filters by user_id when auth present; orders POST recalculates total server-side via calculateOrderTotal, validates items, links user_id; orders [id] checks ownership for user orders, allows guest orders for confirmation
- [x] DB improved: atomic write via renameSync, ensureDataDir, calculateOrderTotal helper, findProductById
- [x] Currency fixed: £ not $
- [x] SEO: nuxt.config head with meta, OG, twitter, structured data LocalBusiness Bakery, robots.txt with disallow for account/checkout/confirmation
- [x] Build passes (2.37 MB, 609 kB gzip)
- [x] Dev server runs, pages load, APIs work

## BROKEN
- None critical known. Minor: catering enquiry form is demo (no email integration) — documented.

## INCOMPLETE / FUTURE
- Payment integration (currently collection + pay on collection) — structure ready for Stripe/PayPal
- Email sending for catering enquiry + order confirmation — needs external service (Resend, SendGrid)
- Admin dashboard for order status updates — out of scope for customer platform, can be added later
- Real photography replacement — currently Unsplash placeholders with appropriate alt text, easily replaceable
- Sitemap.xml dynamic generation — currently static robots, can add nitro route

## DESIGN
- Direction: European artisan deli, warm premium, Vienna coffee house meets Manchester neighbourhood institution, editorial, warm, authentic
- Tokens: cream, warm-white, cream-dark, dark, warm-brown, primary burgundy, gold, border, success/error
- Typography: Playfair Display display, DM Sans body, tight headings, generous line-height
- Components: pill buttons, product cards with hover lift, feature icons, menu tabs, deli pillars, location cards, cart drawer, checkout sections
- Current: Premium, intentional, not AI-template, not overly rounded, not glassmorphism, whitespace deliberate

## ORDERING
- Route: /order shareable, public
- Catalogue: 20 products, 9 categories, active flag
- Categories: breads, bagels, pastries, sizzlers, deli, soups, cakes, drinks
- Product details: image, badge, category, description, price, qty, add to cart, related
- Cart: localStorage persistence, add/remove/qty, itemCount, total, drawer UI
- Checkout: dedicated page, name/email required, phone/location/notes optional, validation, guest or logged-in, order summary
- Order creation: POST /api/orders with items (id,qty) + customer + user (optional), server recalculates total, creates order + order_items
- Confirmation: /order/confirmation/[id] with order details, status, items, collection info
- Order history: /account fetches /api/orders?userId with x-user-id header, returns user's orders with items
- Authorization: orders list filtered by user_id, order detail checks ownership for user orders, guest orders public for confirmation
- Mobile: category tabs scrollable, product list 1 col on mobile, cart drawer full width on mobile, checkout grid 1 col on tablet, forms responsive

## DATABASE
- File: data/barbakan.json, JSON with products, users, orders, order_items
- Products: id, name, description, price (GBP), category, image, active, badge
- Users: id, name, email (lowercase), password (bcrypt hashed), created_at
- Orders: id, user_id (nullable), status (pending), total (server-calculated), customer_name, customer_email, customer_phone, delivery_address (location), notes, created_at
- Order_items: id, order_id, product_id, quantity, price (at time of order)
- Helpers: getDb, saveDb atomic, getNextId, calculateOrderTotal (validates products, caps qty 1-99, rounds total)

## AUTH
- System: bcryptjs 10 rounds, JSON users
- Frontend: useAuth composable, useState, localStorage barbakan_user + cookie barbakan_user (30 days), isLoggedIn computed, init() loads from localStorage, login/register via $fetch, logout clears
- Backend: /api/auth/register validates name 2-80, email format, password 6-128, checks duplicate, hashes; /api/auth/login validates email, compares hash
- Protected: account page shows login prompt if not logged in; orders API requires auth for list and user order detail
- Security: No password exposure, hashing ok, no rate limiting yet (can add later)

## NEXT
- P0 done
- P1 done
- P2 done
- P3 polish: final visual QA, accessibility QA, performance QA — in progress, leave dev server running for user review

## DESIGN SYSTEM AUTHORITY — getdesign.md

- Fetched getdesign.md website (https://getdesign.md/) — catalog of 550+ DESIGN.md analyses
- Installed Starbucks DESIGN.md via `npx getdesign@latest add starbucks` — warm cream canvas #f2f0eb, four-tier green system, full-pill 50px buttons, scale 0.95 active, whisper dual-shadows, floating Frap circular CTA, color-block rhythm cream→white→dark-green→cream→dark footer
- Analyzed Mastercard DESIGN.md — warm putty-cream #F3F0EE, orbital pill shapes, stadium 40px radius, circular portraits with satellite CTA, full-pill editorial rows, soft atmospheric shadows 0 24 48 / 0.08, 4/20/24/40/999px radius scale, editorial warmth
- Analyzed Notion DESIGN.md — warm minimalism #f6f5f4 canvas, serif headings, soft surfaces, hairline borders, 4/8/12/9999px radius split, layered micro-shadows, Inter tight tracking
- Analyzed Apple DESIGN.md — premium white space, SF Pro, cinematic imagery, edge-to-edge tiles, Action Blue pill CTAs, 18px store cards, backdrop blur nav, surface change as elevation

**Barbakan synthesis created as `getdesign.md` in repo root:**
- Cream #FFF9F2 primary canvas (Starbucks neutral warm + Mastercard canvas) — paper bread bags
- Four-tier burgundy #8B1A1A system (Starbucks four greens) — primary, dark, light, tint
- Gold #C8951A reserved for awards ceremony only (Starbucks gold)
- Typography: Playfair Display serif display (Notion serif + Mastercard MarkForMC) + DM Sans body (SoDoSans/Inter) with tight -0.01em / -0.02em tracking
- Buttons: 50px full-pill 9999px universal, scale 0.95 active (Starbucks signature)
- Cards: 16px radius (Starbucks 12px + Mastercard 40px stadium) with whisper dual-shadow
- Spacing: 8px base, 16px rhythm constant, sections 96-128px desktop (Starbucks rem scale + Mastercard 96/128)
- Elevation: layered low-alpha whisper shadows, Frap floating cart CTA signature
- Imagery: photographed physical product, natural light, fade-in 0.3s
- Layout: cream hero dark with burgundy gradient → white bakery → cream deli → dark pan with gold orbital glow → cream-warm menu → white catering → cream locations → dark footer (Starbucks color-block bookends)

**Applied enhancements:**
- Added floating Frap cart CTA (56px circular burgundy, bottom-right mobile, shadow stack base+ambient, scale 0.95 active) — visible only on mobile when cart has items
- Refined shadows to whisper-soft layered (card: 0 0 .5px rgba(0,0,0,.14),0 1px 1px rgba(0,0,0,.24); nav triple-layer; Frap base+ambient)
- Added orbital decorative circles in hero (Mastercard orbital arcs)
- Tight tracking -0.01em body, -0.02em display, -0.03em hero, +0.16em eyebrow uppercase
- Stadium hero frame 24px radius + shadow-xl for story media
- Full-pill editorial rows for category tabs (Mastercard)
- Image fade-in animation
- Apple premium whitespace: sections clamp(72px,9vw,128px)
- Notion warm minimalism: soft surfaces, hairline borders, form focus primary-tint ring

## QA STATUS (2026-09-26)
- Public Website Desktop: OK — hero with orbital circles + stadium visual, story, bakery, deli, pan with gold glow, menu, catering, locations, footer all render, responsive, premium editorial
- Public Website Mobile: OK — header collapses to toggle, mobile nav opens, hero meta hidden, grids 1 col, floating Frap cart visible when items
- Ordering Desktop: OK — browse with breadcrumb + eyebrow, categories orbital pills, add to cart, cart drawer, checkout, confirmation
- Ordering Mobile: OK — product list 1 col, cart drawer full width, floating cart CTA, checkout 1 col, touch targets 44px min
- Auth: Register → login → account → orders filtered OK
- Security: orders GET without auth returns [], price manipulation blocked, ownership check works
- Build: passes (2.39 MB, 611 kB gzip), no TS errors, no critical console errors
- Design: Follows getdesign.md principles — pill buttons 50px + scale 0.95, whisper shadows, cream canvas, tight tracking, orbital shapes, floating CTA, color-block rhythm

## FINAL STATE
- Overall: Functional, premium, secure, ready for staging
- Public Website: Premium editorial, Barbakan-specific, responsive
- Ordering: Shareable URL /order, full journey working, mobile optimized, secure
- Auth: Functional with persistence
- DB: JSON file, working
- SEO: Meta, OG, structured data, robots
- Security: Fixed P0 issues, no exposed secrets
- Known Issues: Catering form demo only, no live payment, no admin
- Next Priority: User review, then deploy to staging, add email service if needed
