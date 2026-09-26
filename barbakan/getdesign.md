# Barbakan Delicatessen & Bakery — DESIGN.md
# Inspired by Starbucks + Mastercard + Notion + Apple (via getdesign.md)

> This is the primary design authority for Barbakan. All UI work must follow this file.
> Synthesis of Starbucks (warm cream canvas, full-pill buttons, retail ordering), Mastercard (warm cream, orbital pills, editorial warmth, stadium radius), Notion (warm minimalism, serif headings, soft surfaces), Apple (premium white space, cinematic imagery).

## 1. Visual Theme & Atmosphere

Barbakan is a **62-year-old European artisan bakery and continental deli** — a Manchester institution. The design should feel like stepping into a warm, wood-lined deli on a winter morning: the smell of fresh bread, the glow of the oven, the quiet confidence of craft perfected over decades.

**Not a generic restaurant template. Not a SaaS dashboard. Not a Tailwind starter.**

The canvas is **warm cream #FFF9F2** — referencing paper bread bags, flour-dusted counters, café walls — alternating with **warm-white #FFFDF9** for cards and **cream-dark #F5EDE0** for separators. The brand anchor is **Barbakan Burgundy #8B1A1A** — deep, wine-like, appetizing, not bright red — used for primary CTAs, headings, and the Saturday Pan feature band. **Gold #C8951A** is reserved for awards ceremony only (10+ national awards, 1964 est.) — never as general accent.

Typography carries heritage: **Playfair Display** serif for display moments (hero, section titles, product names) — elegant, traditional, editorial like Notion's serif headings and Mastercard's MarkForMC. **DM Sans** for body — clean, modern readability like SoDoSans/Inter with tight -0.01em tracking. Weight shifts (700 vs 400) carry hierarchy, not size jumps.

Geometry breathes through **full-pill buttons (50px radius, 9999px)** universal, `scale(0.97)` active press — the signature micro-interaction from Starbucks. Cards take **16px radius** with whisper-soft dual-shadow `0 1px 3px rgba(26,18,9,.06), 0 1px 2px rgba(26,18,9,.04)` — like Notion's barely-there layered shadow, never heavy. The floating cart CTA is the signature elevation element — 56px circular, burgundy fill, layered shadow stack, fixed bottom-right on mobile ordering.

**Color-block page rhythm (Starbucks pattern):** Cream hero (dark with burgundy gradient) → White bakery section → Cream deli section → Dark burgundy Saturday Pan feature band with white text → Cream-warm menu section → White catering → Cream locations → Dark footer — espresso-dark bookends around bright body.

Imagery: **photographed physical product** — every bread, sizzler, pastry is a distinct natural-light photograph, not generated graphic. Warm, soft shadows, flour dust, hands of baker.

## 2. Color Palette & Roles

### Primary — Four-Tier Burgundy System (like Starbucks four greens)

- **Primary #8B1A1A** — Historic brand burgundy. Headings, primary CTA fill, award badges, feature band. The main brand signal.
- **Primary Dark #6B1414** — Hover state, pressed CTA, deep accent.
- **Primary Light #A82828** — Secondary accent, focus rings, decorative.
- **Primary Tint #F5EBEB** — Valid field tint, light wash, hover background for nav links.

### Secondary & Accent

- **Gold #C8951A** — Reserved for awards ceremony only: 62 years, 10+ awards, est. 1964, heritage badges. Never general-purpose.
- **Gold Dark #A87914** — Gold hover.
- **Gold Light #E8B84B** — Softer gold wash for badge backgrounds.
- **Gold Tint #FBF3E4** — Cream-gold wash for award sections.

### Surface & Background

- **Cream #FFF9F2** — Primary page canvas, warm, paper-like. Never pure white.
- **Cream Warm #F5EDE0** — Zone separator, alternation, warm wash.
- **Cream Dark #EDE3D4** — Deeper separator, map placeholders, image fallback.
- **Warm White #FFFDF9** — Card and modal surface, slightly warmer than pure white.
- **White #FFFFFF** — Floating nav pill, modal cards, highest lift.
- **Dark #1A1209** — Footer, hero background, Saturday Pan band, deep surfaces. Warm near-black, not pure black.

### Neutrals & Text

- **Text #2D1F15** — Primary body on light, 87% opacity warm black.
- **Text Muted #8A7164** — Secondary, metadata, descriptions.
- **Warm Brown #5C3D2E** — Nav links, secondary headings.
- **Border #E8DDD0** — 1px hairlines, card borders.
- **Border Dark #D4C4B0** — Stronger borders, disabled.
- **Success #3D7A4A** — Confirmation, valid states.
- **Error #B91C1C** — Destructive, invalid.

No gradients for structural hierarchy — solid color-block only. Shadows carry depth.

## 3. Typography Rules

### Font Family

- **Display:** `Playfair Display, Georgia, Times New Roman, serif` — hero, h1-h4, product titles, quotes. Weight 700, tight -0.02em tracking, editorial.
- **Body:** `DM Sans, -apple-system, system-ui, sans-serif` — body, nav, buttons, forms, captions. Weight 400-600, -0.01em tracking.
- **Fallback:** system-ui sans for body, Georgia serif for display.

### Hierarchy

| Role | Size | Weight | Line Height | Tracking | Usage |
|------|------|--------|-------------|----------|-------|
| Display Hero | clamp(2.75rem,6vw,4.75rem) | 700 | 0.95 | -0.03em | Hero Authentic. Artisan. Delicious. |
| H2 Section | clamp(2rem,4vw,3rem) | 700 | 1.15 | -0.02em | Section titles |
| H3 Card | clamp(1.4rem,2.5vw,1.9rem) | 700 | 1.2 | -0.015em | Product cards |
| Eyebrow | 0.7rem | 700 | 1 | +0.16em uppercase | Section labels |
| Body Large | 19px | 400 | 1.75 | -0.01em | Hero sub, lead |
| Body | 16px | 400 | 1.7 | -0.01em | Default copy |
| Small | 14px | 600 | 1.5 | -0.01em | Button labels |
| Micro | 13px | 400 | 1.4 | 0 | Captions |
| Quote | 1.15rem | 400 italic | 1.65 | 0 | Testimonials, Frankie Dyer |

**Principles:**
- Tight negative tracking -0.01em universal for DM Sans confidence
- Weight shifts carry hierarchy, not size jumps (H1/H2 same size range, weight + color difference)
- Body never pure black — Text #2D1F15 matches warm canvas
- Serif only for display moments, never for UI controls
- Line-height 1.7 for body readability, 0.95-1.15 for display impact

## 4. Component Stylings

### Buttons — Full-Pill Universal (Starbucks + Mastercard)

Every button is **50px full-pill (9999px radius)** with `scale(0.97)` active press and `all 0.2s ease` transition. This is non-negotiable.

- **Primary Filled:** bg #8B1A1A, text #fff, border 1.5px #8B1A1A, radius 9999px, padding 14px 28px, font DM Sans 0.9rem 600 -0.01em. Hover #6B1414 + shadow-md. Active scale 0.97. Use for main CTAs: Order Online, Place Order, Visit Us.
- **Outline:** bg transparent, text #8B1A1A, border 1.5px #8B1A1A, same radius/padding. Hover fills burgundy with white text.
- **Gold:** bg #C8951A, text #fff, border gold. Reserved for awards, Saturday Pan CTA. Hover #A87914.
- **White:** bg #fff, text #1A1209, border white. Used on dark bands (hero, pan) — white button with dark text, like Starbucks green-on-green inverted.
- **Ghost:** bg transparent, text muted, border transparent, padding 10px 16px. Hover #F5EBEB tint.
- **Frap Floating Cart CTA (Signature Elevation):** bg #8B1A1A, icon white, size 56px circle, radius 50%, fixed bottom-right (20px from edge), shadow stack `0 0 6px rgba(26,18,9,.24)` + `0 8px 12px rgba(26,18,9,.14)`, active ambient fades, scale 0.95. This floats over ordering surfaces on mobile — the product's signature depth move.

### Cards & Containers

- **Product Card:** bg #FFFDF9 warm-white, border 1px #E8DDD0, radius 16px, shadow-xs default, shadow-md on hover, translateY -4px. Image aspect 4/3, scale 1.04 on hover, badge absolute top-left gold-tint. Body padding 20px, label 0.68rem gold uppercase, title Playfair 1.15rem, desc 0.875rem muted, footer border-top light.
- **Product Item (Ordering):** bg white, radius 12px, border 1px border, padding 14px, flex gap 14px, hover border primary + shadow-sm + translateY -1px. Image 88px square radius 8px, name 0.95rem 600, desc 0.82rem muted 2-line clamp, price Playfair 1.05rem burgundy, add-btn pill burgundy.
- **Deli Pillar:** bg warm-white, border 1px border, radius 16px, padding 28px, hover shadow-sm + translateY -2px. Label 0.68rem green uppercase, h3, p 0.9rem muted.
- **Location Card:** bg warm-white, border 1px border, radius 16px, padding 24px, hover shadow-sm + translateY -2px.
- **Stadium Hero Frame (Mastercard):** radius 24px, bg dark, shadow-xl, full-bleed media holder — used for story media.
- **Full-Pill Editorial Row (Mastercard):** radius 999px, bg #FCFBFA, shadow float — inspiration for category tabs.

### Inputs & Forms

- **Floating Label Input (Starbucks):** Label floats above border when focused/filled, 1.9rem desktop → 1.4rem active, 12px offset, -12px translate. Field padding 12px, form padding 16px, valid tint #F5EBEB, invalid tint #FEF2F2.
- **Our Implementation:** Input bg white, border 1.5px #E8DDD0, radius 8px, padding 12px 14px, font 0.9rem, focus border primary + 0 0 0 3px primary-tint, error border error + error message 0.8rem.
- **Select:** Custom chevron, same border/radius, background white.
- **Textarea:** min-height 110px, resize vertical.
- **Form Card:** max-width 560px, bg warm-white, border 1px border, radius 16px, padding 32px, shadow-sm.

### Navigation

- **Global Nav (Starbucks):** Fixed, progressive heights 64→72→83→99px, shadow triple-layer `0 1px 3px rgba(0,0,0,.1), 0 2px 2px rgba(0,0,0,.06), 0 0 2px rgba(0,0,0,.07)`, left logo, primary links inline 0.875rem 500 warm-brown, right actions cart + CTA.
- **Our Nav:** Height 72px, bg rgba(255,249,242,.92) blur 16px, border-bottom 1px border, scrolled shadow-sm + bg rgba(255,253,249,.96). Logo Playfair 1.6rem + tag 0.58rem uppercase muted. Nav links 8px 14px radius 8px, hover primary + primary-tint bg. CTA pill primary. Cart link pill bordered white, badge absolute -6px -6px burgundy 18px circle.
- **Mobile Nav:** Hamburger 22px × 2px bars, transforms to X when open. Drawer fixed inset header-h 0 0 0, bg cream, padding 24px, border-top 1px border, gap 4px, overflow-y auto, links 1.05rem 500 warm-brown 14px 16px radius 12px.

### Image Treatment (Apple + Starbucks)

- Hero: Product photography — breads in natural light, flour dust, hands, wood tables — occupies 40vw split or full-bleed with burgundy gradient overlay (135deg, rgba(26,18,9,.88) → rgba(139,26,26,.35))
- Product cards: 4/3 aspect, natural light, slight soft drop-shadow, scale on hover, fade-in opacity 0.3s ease-in
- Gift-card equivalent: Each bread/pastry is distinct photographed physical product, not generated graphic
- No heavy filters, no oversaturated stock

### Feature Band (Starbucks House Green → Barbakan Burgundy)

Full-width dark band bg #1A1209 (or #8B1A1A primary) with radial gold glow `ellipse at 30% 50%, rgba(200,149,26,.12)`. Left white headline + translucent-white secondary + CTA row (gold primary + white outline). Right product photography. Split 1fr 1fr, stacks on <900px.

## 5. Layout Principles

### Spacing System — 8px Base, 16px Rhythm Constant (Starbucks + Notion)

Rem-based, 1rem = 16px. --space-3 (16px) is universal rhythm.

| Token | Pixels | Use |
|-------|--------|-----|
| --space-1 | 4px | Tightest inline |
| --space-2 | 8px | Small gap |
| --space-3 | 16px | Default — card padding, gutter xs, rhythm constant |
| --space-4 | 24px | Section inner, gutter md |
| --space-5 | 32px | Major between |
| --space-6 | 40px | Large gaps, gutter lg |
| --space-7 | 48px | Section-to-section |
| --space-8 | 56px | Very large — Frap height |
| --space-9 | 64px | Widest section padding |
| --space-10 | 80px | Hero vertical |
| --space-11 | 96px | Section breathing |
| --space-12 | 120px | Max breathing |

Section padding: clamp(64px,8vw,112px) desktop, 48-64px mobile. Gutter: 16px mobile → 24px tablet → 32px desktop.

### Grid & Container

- Container max 1200px, narrow 840px, text 640px
- Grid 3-col desktop → 2-col tablet → 1-col mobile (product cards)
- Ordering product list 2-col → 1-col <700px
- Hero asymmetric 60/40 or full-bleed with content max 680px

### Whitespace Philosophy (Apple + Notion)

Whitespace carries feeling of "plenty of space in the bakery". Section padding generous 64-112px. Content blocks separated by whitespace + subtle border, not heavy dividers. Cream canvas itself is visual breath between white cards and burgundy bands.

### Border Radius Scale (Mastercard + Starbucks)

- 4px micro-chips
- 8px inputs, utility
- 12px ordering product items, small cards
- 16px product cards, location cards, deli pillars
- 20px auth cards, checkout sections
- 24px story media, hero media
- 9999px pills — buttons, badges, category tabs, cart link, nav CTA

## 6. Depth & Elevation

| Level | Shadow | Use |
|-------|--------|-----|
| Flat | no shadow | Sits on canvas |
| xs | 0 1px 2px rgba(26,18,9,.05) | Subtle |
| sm | 0 1px 3px rgba(26,18,9,.06), 0 1px 2px rgba(26,18,9,.04) | Nav scrolled, small cards |
| md | 0 4px 16px rgba(26,18,9,.08), 0 2px 6px rgba(26,18,9,.05) | Product card hover, buttons hover |
| lg | 0 8px 24px rgba(26,18,9,.10), 0 3px 8px rgba(26,18,9,.06) | Auth card, cart drawer |
| xl | 0 20px 48px rgba(26,18,9,.14), 0 8px 16px rgba(26,18,9,.08) | Story media badge, hero meta |
| Frap Base | 0 0 6px rgba(26,18,9,.24) | Floating cart base |
| Frap Ambient | 0 8px 12px rgba(26,18,9,.14) | Floating cart lift |

Philosophy: Whisper-soft, layered low-alpha, never single heavy drop shadow. Color-block banding carries perceived depth (dark bands read as recessed feature zones).

## 7. Do's and Don'ts

### Do

- Use cream #FFF9F2 as page canvas, not pure white — warm temperature is load-bearing
- Map four-tier burgundy to roles: Primary for CTA, Dark for hover, Light for focus, Tint for valid/hover bg
- Reserve Gold for awards ceremony only (62 years, 10+ awards, est. 1964)
- Keep tracking tight -0.01em for DM Sans, -0.02em for Playfair Display
- Use 9999px full-pill on every button without exception
- Apply scale(0.97) active press universally
- Layer 2-3 low-alpha shadows, never one heavy
- Use floating cart circular CTA as persistent ordering entry on mobile
- Let cream canvas breathe between cards — whitespace, not dividers
- Photograph physical product in natural light, flour dust, hands
- Use Playfair Display for display, DM Sans for UI — never mix serif into controls
- Alternate cream/white/dark bands for rhythm — espresso-dark bookends

### Don't

- Don't use pure white as page canvas — warm cream is signature
- Don't pick one burgundy — four-tier system intentional
- Don't use Gold as general accent — awards only
- Don't square buttons — pill is universal
- Don't introduce gradients for structural hierarchy — solid color-block only
- Don't weight-contrast H1/H2 by size only — use weight + color
- Don't use pure black for body — Text #2D1F15 matches warm canvas
- Don't skip scale(0.97) active feedback — signature micro-interaction
- Don't stack single heavy shadows
- Don't introduce serifs into ordering flow controls
- Don't use generic AI patterns: random gradients, glassmorphism, excessive rounded cards, giant generic hero, fake stats, fake testimonials, glowing borders, repetitive card grids, meaningless animations

## 8. Responsive Behavior

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Mobile | <640px | Single column, nav → hamburger, hero meta hidden, product grid 1-up, category tabs scroll, cart drawer full-width, buttons full-width lg |
| Tablet | 640-1024px | 2-up product grid, story grid 1-col, pan grid 1-col, checkout 1-col, locations 1-col |
| Laptop | 1024-1280px | 3-col product grid, tightened gutters |
| Desktop | ≥1280px | Full multi-col, centered 1200px, generous whitespace 96-112px sections |

Touch targets: Pill CTAs min 44x44, cart badge 18px with 44px tap area via padding, floating cart 56px well above minimum, qty buttons 40px circle (28px in cart).

Collapsing: Nav height fixed 72px (Starbucks progressive not needed for simplicity), hero 92vh → stacked, product grid 3→2→1, feature bands full-width text+image stack, outer gutter 16→24→32px.

Image behavior: Hero product photography crops tighter vertically on mobile, content becomes anchor, fade-in opacity 0.3s ease-in.

## 9. Barbakan-Specific Implementation

### Brand Translation (Starbucks → Barbakan)

- Starbucks Green #006241 → Barbakan Burgundy #8B1A1A (appetizing, wine-like, bread crust)
- Starbucks Gold #cba258 → Barbakan Gold #C8951A (awards, heritage)
- Neutral Warm #f2f0eb → Cream #FFF9F2 (paper bread bags)
- SoDoSans → DM Sans (open-source, similar humanist geometric, -0.01em tracking)
- Lander Tall serif → Playfair Display (editorial warmth, bakery heritage)
- Frap floating CTA → Cart floating CTA (56px burgundy circle, bottom-right on mobile ordering)
- Gift-card photographed product → Bread/pastry photographed product
- Rewards status cards → Deli pillars, location cards
- Feature band House Green #1E3932 → Dark #1A1209 or Primary #8B1A1A with gold glow

### Page Rhythm

1. Hero dark with burgundy gradient, badge gold, meta cards (62/10+/50+), scroll indicator
2. Intro strip burgundy with stats
3. Awards marquee dark with gold
4. Story cream — media 4/3 stadium radius + badge + text with quote
5. Bakery white — 3 product cards with badges
6. Deli cream — features + pillars
7. Saturday Pan dark — burgundy band with gold badge + media
8. Menu cream-warm — tabs pill, menu items with icon + price
9. Catering white — pillars + form card
10. Locations cream — location cards with map placeholder
11. Footer dark

### Ordering Platform as Separate Product

Ordering is a premium extension, not generic ecommerce template. Shareable /order URL, own header (back to Barbakan + brand + cart), toolbar with title + product count, category tabs full-pill scrollable, product list with 88px images, price Playfair burgundy, add-btn pill. Cart drawer slide-over with overlay blur, qty controls, total, checkout CTA. Checkout dedicated page with form + sticky order summary. Confirmation with success icon, order number, status pill, items, collection details.

Mobile ordering is first-class: category tabs touch-scroll, product list 1-col, cart drawer full-width, floating cart CTA, checkout 1-col, forms full-width.

## 10. Agent Prompt Guide

- Primary CTA: "Burgundy #8B1A1A, white text, 9999px pill, 14px 28px, DM Sans 0.9rem 600 -0.01em, scale 0.97 active, shadow-md hover"
- Secondary: "Transparent, burgundy text, 1.5px burgundy border, same radius/padding"
- Card: "Warm-white #FFFDF9, border 1px #E8DDD0, radius 16px, shadow-xs, shadow-md hover, translateY -4px, image 4/3, badge gold-tint"
- Page canvas: "Cream #FFF9F2, not pure white"
- Heading: "Playfair Display 700 -0.02em, Text #2D1F15"
- Body: "DM Sans 400 1.7 -0.01em, Text Muted #8A7164 for secondary"
- Section: "Padding clamp(64px,8vw,112px), gutter 16→32px, whitespace not dividers"
- Elevation: "Layer 2-3 low-alpha shadows, never heavy, Frap floating cart signature"
- Gold: "Reserved for awards only, #C8951A"
- Imagery: "Photographed physical product, natural light, flour dust, hands, wood tables, fade-in 0.3s"

When refining, focus on ONE component, reference exact hex + role, preserve pill + scale, map burgundy tiers correctly, no gradients, tight tracking, cream canvas breathing.
