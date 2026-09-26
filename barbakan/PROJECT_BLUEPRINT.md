# Barbakan Delicatessen & Bakery — Website Blueprint

## 1. Project Overview

**Type:** Showcase redesign website (prospect demo — NOT to be confused with Barbakan's existing site at barbakan-deli.co.uk)
**Purpose:** Demonstrate what a premium, beautifully designed website could look like for Barbakan, highlighting their 62-year heritage, artisan products, and premium positioning.
**Note:** This uses Barbakan's verified real business data. The existing website (barbakan-deli.co.uk) is a functional site — this is a design showcase.

---

## 2. Verified Business Facts

| Fact | Verified Source |
|------|----------------|
| Name: Barbakan Delicatessen & Bakery | barbakan-deli.co.uk, MEN article |
| Tagline: "Authentic. Artisan. Delicious." | barbakan-deli.co.uk |
| Founded: 1964 | MEN article, barbakan-deli.co.uk |
| Chorlton: 67-71 Manchester Road, Chorlton, Manchester M21 9PW | MEN article, barbakan-deli.co.uk |
| Wilmslow: 1A Moor Lane, Wilmslow SK9 6AG | barbakan-deli.co.uk |
| Owner/Director: Frankie Dyer | MEN article |
| Staff: ~50 people | MEN article |
| Turnover: £2.3M/year | MEN article |
| Awards: 10+ national awards | MEN article |
| Products: 50+ bread/pastry varieties, bagels, sourdough, continental deli | barbakan-deli.co.uk, Restaurantji |
| Award-winning German Norlander loaf | barbakan-deli.co.uk |
| 48-hour fermented sourdough | barbakan-deli.co.uk |
| Ciabatta sizzlers (hot sandwiches) | Menu page |
| Saturday outdoor German sausage pan | barbakan-deli.co.uk |
| Catering, bespoke hampers | barbakan-deli.co.uk |
| Wholesale: Uni of Manchester, Bents Garden Centre, First Street Bagels | MEN article |
| Community: sponsors youth sports, donates to Francis House, The Christie, Red Cross | MEN article |
| Facebook: 6,832 followers | DuckDuckGo search |
| Deliveroo, Uber Eats | DuckDuckGo search |
| Company No: 789549 | barbakan-deli.co.uk |
| **NOT VERIFIED — DO NOT INCLUDE:** Opening hours, phone number, email | — |

---

## 3. Strategy

### Website Goal
Introduce Barbakan to visitors who discover them online, communicate their heritage and quality, drive foot traffic to both locations, generate catering enquiries, and build trust.

### Target Audience
- Chorlton/Wilmslow locals looking for a daily bakery/cafe
- Food lovers seeking artisan continental European products
- Event planners/hosts looking for catering or bespoke hampers
- Businesses seeking wholesale bread/deli products

### Core User Journeys
1. Visitor lands → understands WHO Barbakan is (62 years, artisan, Chorlton institution) → visits the shop
2. Visitor explores Bakery → sees bread varieties → orders/tries
3. Visitor explores Deli → sees continental products → plans a visit
4. Organiser needs catering → fills catering enquiry form
5. Business needs wholesale → contacts via wholesale page

---

## 4. Design Direction

### Aesthetic
European artisan deli, warm and premium. Think: Vienna coffee house meets Manchester neighbourhood institution. Rich, warm, traditional but refined.

### Colour Palette
```
--cream:        #FFF9F2   (background, warmth)
--warm-white:   #FFFDF9   (card backgrounds)
--cream-dark:   #F5EDE0   (section alternation)
--dark:         #1A1209   (primary text)
--warm-brown:   #5C3D2E   (secondary text, muted)
--primary:      #8B1A1A   (burgundy-red — accent, CTA)
--primary-dark: #6B1414   (hover states)
--gold:         #C8951A   (accent highlights)
--green:        #4A6741   (natural/artisan feel)
--border:       #E8DDD0   (dividers, borders)
```

### Typography
- **Headings:** "Playfair Display" (serif) — elegant, traditional, premium
- **Body:** "DM Sans" — clean, modern readability
- **Accent/Labels:** "DM Sans" uppercase tracking

### Layout
- Single-page design with smooth-scroll anchor sections
- 8 sections: Hero, Story, Bakery, Deli, Saturday, Menu, Catering, Locations
- Full-width hero → alternating cream/white sections
- Generous whitespace — breathing room reflects artisan quality
- No excessive animations — clean, professional feel

### Photography Style
Warm, natural light food photography aesthetic. Placeholder structure (images can be replaced with actual photos). No stock-photo overload.

---

## 5. Information Architecture

**Navigation (sticky):**
- Logo: "Barbakan"
- Links: Our Story | The Bakery | The Deli | Saturday Pan | Menu | Catering | Visit Us
- CTA: "Find Us" button

**Sections:**

1. **HERO** — Full-viewport. Tagline, brief intro, CTA to explore/visit
2. **OUR STORY** — 62 years heritage, Frankie Dyer quote, awards mention
3. **THE BAKERY** — Products: breads, bagels, sourdough, pastries
4. **THE DELI** — Continental cheeses, charcuterie, olives, made-to-order food
5. **SATURDAY PAN** — Weekend outdoor sausage pan, special event
6. **OUR MENU** — Breakfast, ciabatta sizzlers, soups, quiches, drinks
7. **CATERING & HAMPERS** — Bespoke hampers, event catering, enquiry form
8. **VISIT US** — Both locations, hours placeholder, map, contact form

**Footer:**
- Both addresses
- Links to existing site, social
- "Award-winning artisan bakery" tagline
- Copyright

---

## 6. Technical Approach

- **Stack:** HTML5 + CSS3 (CSS custom properties, Grid, Flexbox) + Vanilla JavaScript
- **No build step required** — runs directly in browser
- **Responsive:** Mobile-first CSS
- **SEO:** Semantic HTML, meta tags, Open Graph, structured data (LocalBusiness)
- **Performance:** System fonts with Google Fonts (display=swap), no heavy libraries
- **Accessibility:** ARIA labels, keyboard nav, focus states, contrast checks

---

## 7. Known Missing Information (confirm with Barbakan before going live)

- Opening hours (both locations)
- Phone number
- Email address
- Actual photography (placeholder structure ready for real images)