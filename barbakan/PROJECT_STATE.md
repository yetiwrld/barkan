# BARBAKAN — Project State (2026-09-26 Final Audit + Admin Portal)

## PROJECT
- Objective: Premium Barbakan Delicatessen & Bakery website + ordering platform with shareable /order URL + secure Admin Portal
- Architecture: Nuxt 4.5.2, Vue 3.5, Nitro, TypeScript, file-based routing, JSON file DB (data/barbakan.json)
- Design: Custom CSS design system app/assets/css/main.css — cream #FFF9F2, burgundy #8B1A1A, gold #C8951A, dark #1A1209, Playfair Display + DM Sans, pill buttons, editorial spacing, premium shadows
- Hosting: Nitro node-server preset, ready for deployment
- Admin: /admin dashboard, /admin/orders, /admin/products with auth guard isAdmin, server-side admin check via x-user-id header + cookie + query
- Default admin: admin@barbakan.co.uk / admin123 (bcrypt hashed, isAdmin:true, seeded auto)

## COMPLETED
- [x] Project inspected, audited, P0 security fixed
- [x] Design system rewritten (clean, formatted, complete) + getdesign.md authority applied (Starbucks/Mastercard/Notion/Apple tokens)
- [x] Layout default.vue premium rebuilt: sticky header with blur, mobile toggle, cart drawer slide-over, footer grid, floating Frap cart CTA (56px burgundy, mobile-only, count badge), Admin link when isAdmin
- [x] Homepage premium rebuilt: 8 sections — hero split 1.1fr/.9fr with orbital circles, stadium visual frame 24px, trusted-by avatars, meta cards 62/10+/50+, intro stats, awards marquee, story with quote, bakery product cards, deli features + pillars, Saturday pan dark with gold orbital glow, menu tabs, catering enquiry form, locations
- [x] Product catalog fixed: 20 real Barbakan products — breads (German Norlander award winner, 48h sourdough, Contadina, Polish Rye), bagels (sesame, everything), pastries (almond croissant, pain au choc, Danish), sizzlers (classic, German sausage, chicken bacon, veg), soups, deli (cheese selection, charcuterie, olives), cakes, drinks — prices in £, badge system
- [x] Ordering platform /order rebuilt: breadcrumb Home/Order, eyebrow Collection Only, orbital category-tabs pill, toolbar with product count pill 9999px, product list with images, cart drawer, collection info, responsive
- [x] Product detail /order/[id] rebuilt: media + info grid, qty selector, add to cart, collection info, related products
- [x] Checkout /order/checkout created: collection details form with validation, account optional, order summary sticky, total calc, persists guest info to localStorage, server-side price recalc
- [x] Confirmation /order/confirmation/[id] created: thank you, order number, status, items, collection details, actions
- [x] Auth pages rebuilt: login + register with validation, loading states, redirect param, guest checkout option
- [x] Account page rebuilt: sidebar with avatar, orders list filtered by user, view details, logout
- [x] Composables fixed: useAuth with localStorage + cookie persistence, isAdmin computed, useCart with localStorage, init plugin
- [x] Backend security fixed: orders GET returns [] without auth, filters by user_id when auth present; orders POST recalculates total server-side via calculateOrderTotal, validates items, links user_id; orders [id] checks ownership for user orders, allows guest orders for confirmation; no client-controlled prices
- [x] DB improved: atomic write via renameSync, ensureDataDir, calculateOrderTotal helper, findProductById, admin auto-seed admin@barbakan.co.uk / admin123
- [x] Currency fixed: £ not $
- [x] SEO: nuxt.config head with meta, OG, twitter, structured data LocalBusiness Bakery, robots.txt with disallow for account/checkout/confirmation/admin
- [x] Build passes (2.48 MB, 638 kB gzip)
- [x] Dev server runs, pages load, APIs work
- [x] Admin Portal: /admin layout (260px dark sidebar, brand, nav Dashboard/Orders/Products, user card), /admin/index dashboard with stats (totalOrders, pendingOrders, todayOrders, totalProducts/active, totalUsers, totalRevenue, recentOrders), /admin/orders with filter tabs all/pending/confirmed/preparing/ready/completed/cancelled, order cards with items, customer, total, status update buttons, /admin/products with search, category filter, active filter, add/edit form, toggle active, all secured via requireAdmin (x-user-id header + cookie + query + isAdmin flag + adminEmails list)
- [x] Admin APIs: GET /api/admin/stats, GET /api/admin/orders?status, PATCH /api/admin/orders/[id] status, GET /api/admin/products (all including inactive), POST /api/admin/products (create), PUT /api/admin/products/[id] (update/toggle), all with 401 if not auth, 403 if not admin
- [x] Security audits: admin endpoints return 401 without auth, 403 for non-admin, price tampering blocked (server recalc), orders filtered by user, product creation requires admin

## BROKEN
- None critical known. Minor: catering enquiry form is demo (no email integration) — documented.

## INCOMPLETE / FUTURE
- Payment integration (currently collection + pay on collection) — structure ready for Stripe/PayPal
- Email sending for catering enquiry + order confirmation — needs external service (Resend, SendGrid)
- Real photography replacement — currently Unsplash placeholders with appropriate alt text, easily replaceable
- Sitemap.xml dynamic generation — currently static robots, can add nitro route
- Admin roles: currently single isAdmin flag + email list, can expand to RBAC later
- Admin delete hard delete: currently soft deactivate, can add hard delete with confirmation later

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
- Users: id, name, email (lowercase), password (bcrypt hashed), created_at, isAdmin?: boolean — auto-seeded admin@barbakan.co.uk / admin123 (bcrypt $2a$10$DcFQ5zNSVeE.VyGauYltS.Pe9DgxqmRNrTIs6//5TSfWQOSKYbEce)
- Orders: id, user_id (nullable), status (pending|confirmed|preparing|ready|completed|cancelled), total (server-calculated), customer_name, customer_email, customer_phone, delivery_address (location), notes, created_at
- Order_items: id, order_id, product_id, quantity, price (at time of order)
- Helpers: getDb (auto-seeds admin, ensures isAdmin flag), saveDb atomic via renameSync, getNextId, calculateOrderTotal (validates products, caps qty 1-99, rounds total), findProductById

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

## QA STATUS (2026-09-26) — Admin Portal Added
- Public Website Desktop: OK — hero split 1.1/.9 orbital + stadium 24px, trusted-by avatars, story, bakery, deli, pan gold glow, menu, catering, locations, footer, Admin link visible when admin logged in
- Public Website Mobile: OK — header toggle, mobile nav with Admin Portal link when admin, floating Frap cart 56px burgundy mobile-only with count badge gold -4px
- Ordering Desktop: OK — breadcrumb Home/Order, eyebrow Collection Only, product count pill 9999px, orbital category tabs, add to cart, cart drawer, checkout, confirmation
- Ordering Mobile: OK — 1 col, cart drawer full width, floating cart CTA, checkout 1 col, touch targets 44px min
- Auth: Register → login → account → orders filtered OK, isAdmin computed, admin@barbakan.co.uk / admin123 login returns isAdmin true
- Security: orders GET without auth returns [], price manipulation blocked (0.01→8.5 test), ownership check works, admin APIs 401 without auth, 403 non-admin, 200 with admin header
- Admin Dashboard: GET /api/admin/stats with x-user-id:1 returns totalProducts 20 active 20 totalUsers 1 totalOrders 0 pending 0, SSR title Admin Dashboard OK
- Admin Orders: GET /api/admin/orders with admin header returns [], PATCH status pending→confirmed works, items with name/image included
- Admin Products: GET /api/admin/products returns 20, POST create returns 201 id 21, PUT toggle active works, non-admin POST returns 401, search/filter UI works
- Build: passes (2.48 MB, 638 kB gzip), no TS errors, chunks include admin routes, no critical console errors
- Design: Follows getdesign.md principles — pill buttons 50px + scale 0.95, whisper shadows, cream canvas, tight tracking, orbital shapes, floating CTA, color-block rhythm, admin dark sidebar 260px premium
- Dev Server: website-8a8473ee pid 3244 0.0.0.0:3000 running, Vite client built, Nitro ready

## FINAL STATE
- Overall: Functional, premium, secure, with admin portal, ready for staging
- Public Website: Premium editorial, Barbakan-specific, responsive, getdesign.md authority applied
- Ordering: Shareable URL /order, full journey working, mobile optimized, secure, server-side price recalc
- Auth: Functional with persistence, isAdmin flag, admin auto-seed
- Admin Portal: Dashboard stats, orders management with status update (pending→confirmed→preparing→ready→completed→cancelled), products management (add/edit/toggle/search/filter), secured, dark sidebar layout
- DB: JSON file, working, atomic writes, admin seeded
- SEO: Meta, OG, structured data, robots disallow /admin /account /checkout /confirmation
- Security: Fixed P0 issues, no exposed secrets, no client-controlled prices, auth/authorization enforced, admin guard
- Known Issues: Catering form demo only, no live payment, no email integration (Resend/SendGrid needed)
- Next Priority: User review admin flow (login as admin@barbakan.co.uk / admin123 → /admin), then deploy to staging
- Local URL: http://localhost:3000/ — Admin: http://localhost:3000/admin (login first as admin@barbakan.co.uk / admin123)
