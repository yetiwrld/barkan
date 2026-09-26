<template>
  <div class="home">
    <!-- Hero — Starbucks + Apple + Mastercard synthesis -->
    <section class="hero">
      <div class="hero__bg"></div>
      <div class="hero__pattern"></div>
      <!-- Orbital decorative circles (Mastercard) -->
      <div style="position:absolute;top:18%;right:12%;width:320px;height:320px;border:1px solid rgba(200,149,26,.14);border-radius:50%;pointer-events:none"></div>
      <div style="position:absolute;top:22%;right:14%;width:280px;height:280px;border:1px solid rgba(255,255,255,.06);border-radius:50%;pointer-events:none"></div>
      <div class="container">
        <div style="display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center;position:relative;z-index:1">
          <div class="hero__content">
            <div class="hero__badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              10+ National Awards · Est. 1964 · Manchester
            </div>
            <h1>Authentic.<br>Artisan.<br>Delicious.</h1>
            <p class="hero__sub">Manchester's finest artisan bakery and continental deli — handcrafting traditional European baked goods and exceptional deli fare since 1964. Sixty-two years of dedication to craft, quality, and community.</p>
            <div class="hero__actions">
              <NuxtLink to="/order" class="btn btn-gold btn--lg">Order Online</NuxtLink>
              <NuxtLink to="#story" class="btn btn-white btn--lg" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.35)">Discover Our Story</NuxtLink>
            </div>
            <div style="margin-top:32px;display:flex;gap:16px;align-items:center">
              <div style="display:flex;align-items:center;gap:8px">
                <div style="display:flex;margin-left:0">
                  <div style="width:28px;height:28px;border-radius:50%;background:var(--cream-dark);border:2px solid var(--dark);display:flex;align-items:center;justify-content:center;font-size:.7rem">🥖</div>
                  <div style="width:28px;height:28px;border-radius:50%;background:var(--gold-tint);border:2px solid var(--dark);margin-left:-8px;display:flex;align-items:center;justify-content:center;font-size:.7rem">🥐</div>
                  <div style="width:28px;height:28px;border-radius:50%;background:var(--warm-white);border:2px solid var(--dark);margin-left:-8px;display:flex;align-items:center;justify-content:center;font-size:.7rem">🧀</div>
                </div>
                <span style="font-size:.82rem;color:rgba(255,255,255,.65)">Trusted by 6,800+ locals</span>
              </div>
            </div>
          </div>
          <!-- Right visual — stadium hero frame (Mastercard) + product photography -->
          <div style="display:none" class="hero-visual">
            <div style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);backdrop-filter:blur(16px);border-radius:24px;padding:12px;box-shadow:0 24px 48px rgba(0,0,0,.18)">
              <div style="aspect-ratio:4/3;border-radius:16px;overflow:hidden;background:var(--cream-dark)">
                <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80" alt="German Norlander loaf — award-winning artisan bread" loading="eager" style="width:100%;height:100%;object-fit:cover" />
              </div>
              <div style="padding:14px 8px 4px;display:flex;justify-content:space-between;align-items:center">
                <div>
                  <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold-light)">Award Winner</div>
                  <div style="font-family:var(--font-display);font-size:1.1rem;color:#fff;margin-top:2px">German Norlander</div>
                </div>
                <div style="font-family:var(--font-display);color:var(--gold-light);font-weight:700">£4.25</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero__meta">
        <div class="meta-card"><strong>62</strong>Years</div>
        <div class="meta-card"><strong>10+</strong>Awards</div>
        <div class="meta-card"><strong>50+</strong>Breads</div>
      </div>
      <div class="hero__scroll">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="6 9 12 15 18 9"/></svg>
        Scroll
      </div>
    </section>

    <!-- Intro strip — Starbucks color-block rhythm -->
    <div class="intro-strip">
      <div class="container intro-strip__inner">
        <div class="intro-stat"><strong>1964</strong><span>Est. Manchester</span></div>
        <div class="intro-stat"><strong>62</strong><span>Years of Craft</span></div>
        <div class="intro-stat"><strong>50+</strong><span>Staff Members</span></div>
        <div class="intro-stat"><strong>10+</strong><span>National Awards</span></div>
        <div class="intro-stat"><strong>2</strong><span>Manchester Locations</span></div>
      </div>
    </div>

    <!-- Awards marquee — editorial warmth -->
    <div class="awards-bar">
      <div class="awards-track">
        <span class="award-item"><strong>10+</strong> National Awards</span>
        <span class="award-item"><strong>1964</strong> Founded</span>
        <span class="award-item"><strong>62</strong> Years Craft</span>
        <span class="award-item"><strong>50+</strong> Breads &amp; Pastries</span>
        <span class="award-item"><strong>Award Winner</strong> German Norlander</span>
        <span class="award-item"><strong>48h</strong> Sourdough</span>
        <span class="award-item"><strong>Wholesale</strong> Uni of Manchester</span>
        <span class="award-item"><strong>10+</strong> National Awards</span>
        <span class="award-item"><strong>1964</strong> Founded</span>
        <span class="award-item"><strong>62</strong> Years Craft</span>
        <span class="award-item"><strong>50+</strong> Breads &amp; Pastries</span>
        <span class="award-item"><strong>Award Winner</strong> German Norlander</span>
        <span class="award-item"><strong>48h</strong> Sourdough</span>
      </div>
    </div>

    <!-- Our Story — Notion warm minimalism + Mastercard stadium frame -->
    <section id="story" class="section">
      <div class="container">
        <div class="story-grid">
          <div class="story-media">
            <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&auto=format&fit=crop&q=80" alt="Barbakan bakery — artisan breads freshly baked" loading="lazy" />
            <div class="story-media__badge">Est. 1964</div>
          </div>
          <div class="story-text">
            <span class="eyebrow">Our Story</span>
            <h2>A Manchester Institution Since 1964</h2>
            <div class="divider"></div>
            <p>Barbakan was founded on a simple belief: that exceptional bread and deli food should be made by hand, using traditional methods and the finest ingredients. For over six decades, we have been a cornerstone of Chorlton-cum-Hardy life, serving generation after generation of families who trust us for their daily bread.</p>
            <blockquote class="quote">
              “We don't take shortcuts. Every loaf is hand-crafted, every sausage sourced with care. That's what sets us apart and always has.”
              <cite>Frankie Dyer, Director</cite>
            </blockquote>
            <p>Today, under the stewardship of Director Frankie Dyer, Barbakan employs around 50 people across our Chorlton and Wilmslow locations. We wholesale to the University of Manchester and local businesses, while remaining true to the neighbourhood bakery ethos that has defined us since the beginning.</p>
            <div style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap">
              <NuxtLink to="/order" class="btn btn-primary">Explore Our Bakery</NuxtLink>
              <NuxtLink to="#bakery" class="btn btn-outline">Our Products</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bakery — Starbucks content cards + Apple premium whitespace -->
    <section id="bakery" class="section section--white">
      <div class="container">
        <div style="text-align:center;max-width:680px;margin:0 auto 56px">
          <span class="eyebrow" style="justify-content:center">The Bakery</span>
          <h2>Handcrafted Daily, Baked With Purpose</h2>
          <p class="lead" style="margin:20px auto 0">From our award-winning German Norlander loaf to our 48-hour fermented sourdough, every item that leaves our ovens carries 62 years of knowledge, passion, and uncompromising quality.</p>
        </div>
        <div class="product-grid">
          <div class="product-card">
            <div class="product-card__image"><img src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80" alt="German Norlander loaf — award-winning German-style artisan bread" loading="lazy" /><span class="product-card__badge">Award Winner</span></div>
            <div class="product-card__body">
              <div class="product-card__label">Signature Loaf</div>
              <h3 class="product-card__title">German Norlander</h3>
              <p class="product-card__desc">Our signature German-style loaf, recognised nationally for its exceptional crust, open crumb, and authentic flavour. A true testament to traditional European baking.</p>
              <div class="product-card__footer"><span style="font-family:var(--font-display);font-weight:700;color:var(--primary)">£4.25</span><NuxtLink to="/order" class="btn btn-outline btn--sm">Order</NuxtLink></div>
            </div>
          </div>
          <div class="product-card">
            <div class="product-card__image"><img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80" alt="48-Hour Sourdough loaf with open, airy crumb" loading="lazy" /><span class="product-card__badge">48h Fermented</span></div>
            <div class="product-card__body">
              <div class="product-card__label">Signature</div>
              <h3 class="product-card__title">48-Hour Sourdough</h3>
              <p class="product-card__desc">Slow-fermented for two full days to develop extraordinarily complex flavour and beautifully open crumb. Made with natural starter.</p>
              <div class="product-card__footer"><span style="font-family:var(--font-display);font-weight:700;color:var(--primary)">£4.50</span><NuxtLink to="/order" class="btn btn-outline btn--sm">Order</NuxtLink></div>
            </div>
          </div>
          <div class="product-card">
            <div class="product-card__image"><img src="https://images.unsplash.com/photo-1585521720278-1b37662f7666?w=600&auto=format&fit=crop&q=80" alt="Freshly boiled and baked Barbakan bagels" loading="lazy" /><span class="product-card__badge">Popular</span></div>
            <div class="product-card__body">
              <div class="product-card__label">Bakery Favourite</div>
              <h3 class="product-card__title">Hand-Rolled Bagels</h3>
              <p class="product-card__desc">Boiled then baked for distinctive chewy texture. Sesame, poppy, everything — supplied to First Street Bagels.</p>
              <div class="product-card__footer"><span style="font-family:var(--font-display);font-weight:700;color:var(--primary)">£4.20 / 4</span><NuxtLink to="/order" class="btn btn-outline btn--sm">Order</NuxtLink></div>
            </div>
          </div>
        </div>
        <div style="text-align:center;margin-top:40px">
          <NuxtLink to="/order" class="btn btn-primary btn--lg">View Full Bakery Range — 20 Products</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Deli — Notion feature cards + Mastercard pillars -->
    <section id="deli" class="section section--cream">
      <div class="container">
        <div class="story-grid">
          <div>
            <span class="eyebrow">The Deli</span>
            <h2>Continental European<br>Delicatessen</h2>
            <div class="divider"></div>
            <p class="lead">Step beyond the bread counter and discover our carefully curated deli. From aged Continental cheeses to hand-carved charcuterie, olives, and house-made preserves.</p>
            <div class="feature-list" style="margin-top:36px">
              <div class="feature-item">
                <div class="feature-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
                <div class="feature-text"><h4>Imported &amp; House-Cured Charcuterie</h4><p>Prosciutto di Parma, chorizo, saucisson, and house-made specials.</p></div>
              </div>
              <div class="feature-item">
                <div class="feature-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></div>
                <div class="feature-text"><h4>Continental Cheeses</h4><p>Curated selection — aged cheddar, gorgonzola, Manchego, camembert, seasonal specials.</p></div>
              </div>
              <div class="feature-item">
                <div class="feature-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M8 12h8"/></svg></div>
                <div class="feature-text"><h4>Olives, Oils &amp; Preserves</h4><p>Kalamata olives, extra virgin olive oils, artisan balsamic, fruit preserves.</p></div>
              </div>
            </div>
          </div>
          <div>
            <div class="deli-highlight">
              <div class="deli-pillar">
                <div class="deli-pillar__label">Catering</div>
                <h3>Events &amp; Functions</h3>
                <p>Bespoke deli platters, sandwich selections, and continental breakfasts for corporate events, weddings, and private celebrations.</p>
              </div>
              <div class="deli-pillar">
                <div class="deli-pillar__label">Wholesale</div>
                <h3>Trade Partners</h3>
                <p>We supply the University of Manchester and Bents Garden Centre. Contact us to discuss wholesale arrangements.</p>
              </div>
              <div class="deli-pillar" style="grid-column:1 / -1">
                <div class="deli-pillar__label">Made to Order</div>
                <h3>Ciabatta Sizzlers &amp; Quiches</h3>
                <p>Our ciabatta sizzlers are incredibly popular in both Chorlton &amp; Wilmslow — grilled to order, built around our own breads. Plus daily quiches, soups, and salads from our kitchen.</p>
                <NuxtLink to="/order" class="btn btn-primary btn--sm" style="margin-top:16px">Order Sizzlers</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Saturday Pan — Starbucks feature band + Mastercard orbital glow -->
    <section id="pan" class="pan-section">
      <div class="container">
        <div class="pan-grid">
          <div class="pan-text">
            <span class="pan-badge">Weekend Favourite</span>
            <h2>The Saturday German Sausage Pan</h2>
            <p>On Saturdays, our outdoor German sausage pan is a Chorlton institution. From 9am until sold out, we fire up the traditional pan and serve freshly grilled German sausages, sauerkraut, and mulled wine in a convivial outdoor setting.</p>
            <p>It's become one of Manchester's most beloved weekend traditions. Bring the family, grab a bench, and enjoy some of the finest German sausages outside of Berlin — right here in Chorlton.</p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:28px">
              <a href="https://www.google.com/maps/search/Barbakan+67-71+Manchester+Road+Manchester" target="_blank" rel="noopener" class="btn btn-gold">Get Directions</a>
              <NuxtLink to="/order" class="btn btn-white" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.35)">Order for Collection</NuxtLink>
            </div>
          </div>
          <div class="pan-media">
            <img src="https://images.unsplash.com/photo-1529041096609-9d5268822e26?w=800&auto=format&fit=crop&q=80" alt="German sausages grilling on outdoor pan" loading="lazy" style="width:100%;height:100%;object-fit:cover;opacity:.9" />
          </div>
        </div>
      </div>
    </section>

    <!-- Menu — Notion tabs + Starbucks product detail -->
    <section id="menu" class="section" style="background:var(--cream-warm)">
      <div class="container">
        <div style="text-align:center;max-width:680px;margin:0 auto 48px">
          <span class="eyebrow" style="justify-content:center">Our Menu</span>
          <h2>Freshly Made Every Day</h2>
          <p class="lead" style="margin:20px auto 0">Morning pastries, ciabatta sizzlers, and artisan drinks from both our Chorlton and Wilmslow locations.</p>
        </div>

        <div class="menu-tabs">
          <button class="menu-tab" :class="{ active: activeTab === 'breakfast' }" @click="activeTab = 'breakfast'">Breakfast</button>
          <button class="menu-tab" :class="{ active: activeTab === 'sizzlers' }" @click="activeTab = 'sizzlers'">Ciabatta Sizzlers</button>
          <button class="menu-tab" :class="{ active: activeTab === 'cakes' }" @click="activeTab = 'cakes'">Cakes &amp; Pastries</button>
          <button class="menu-tab" :class="{ active: activeTab === 'drinks' }" @click="activeTab = 'drinks'">Drinks</button>
        </div>

        <div v-if="activeTab === 'breakfast'" class="menu-grid">
          <div class="menu-item"><div class="menu-item__icon">🍳</div><div class="menu-item__info"><h4>Full English Breakfast</h4><p>Sausage, bacon, eggs, mushroom, tomato, toast</p></div><div class="menu-item__price">£7.95</div></div>
          <div class="menu-item"><div class="menu-item__icon">🥚</div><div class="menu-item__info"><h4>Eggs Benedict</h4><p>Poached eggs, ham, hollandaise on toasted muffin</p></div><div class="menu-item__price">£7.50</div></div>
          <div class="menu-item"><div class="menu-item__icon">🐟</div><div class="menu-item__info"><h4>Smoked Salmon Plate</h4><p>Scottish smoked salmon, cream cheese, capers, bagel</p></div><div class="menu-item__price">£8.50</div></div>
          <div class="menu-item"><div class="menu-item__icon">🥐</div><div class="menu-item__info"><h4>Almond Croissant</h4><p>Butter croissant, almond frangipane, flaked almonds</p></div><div class="menu-item__price">£3.25</div></div>
        </div>

        <div v-if="activeTab === 'sizzlers'" class="menu-grid">
          <div class="menu-item"><div class="menu-item__icon">🥖</div><div class="menu-item__info"><h4>Classic Ciabatta</h4><p>Ham, cheese, tomato, rocket, house pesto</p></div><div class="menu-item__price">£6.50</div></div>
          <div class="menu-item"><div class="menu-item__icon">🌭</div><div class="menu-item__info"><h4>German Sausage Sizzler</h4><p>Grilled German sausage, ciabatta, sauerkraut, mustard</p></div><div class="menu-item__price">£7.25</div></div>
          <div class="menu-item"><div class="menu-item__icon">🍗</div><div class="menu-item__info"><h4>Chicken &amp; Bacon Sizzler</h4><p>Grilled chicken breast, streaky bacon, avocado, mayo</p></div><div class="menu-item__price">£7.95</div></div>
          <div class="menu-item"><div class="menu-item__icon">🥣</div><div class="menu-item__info"><h4>Soup of the Day</h4><p>Freshly made soup with crusty bread. Ask for today's choice.</p></div><div class="menu-item__price">£4.95</div></div>
        </div>

        <div v-if="activeTab === 'cakes'" class="menu-grid">
          <div class="menu-item"><div class="menu-item__icon">🥕</div><div class="menu-item__info"><h4>Carrot Cake</h4><p>Moist carrot sponge, cream cheese frosting, walnut</p></div><div class="menu-item__price">£3.95</div></div>
          <div class="menu-item"><div class="menu-item__icon">🍫</div><div class="menu-item__info"><h4>Chocolate Fudge Cake</h4><p>Rich Belgian chocolate sponge, glossy fudge icing</p></div><div class="menu-item__price">£4.25</div></div>
          <div class="menu-item"><div class="menu-item__icon">🍰</div><div class="menu-item__info"><h4>Victoria Sponge</h4><p>Classic vanilla sponge, strawberry jam, icing sugar</p></div><div class="menu-item__price">£3.50</div></div>
          <div class="menu-item"><div class="menu-item__icon">☕</div><div class="menu-item__info"><h4>Cappuccino Cake</h4><p>Coffee sponge, espresso buttercream, cocoa dust</p></div><div class="menu-item__price">£4.00</div></div>
        </div>

        <div v-if="activeTab === 'drinks'" class="menu-grid">
          <div class="menu-item"><div class="menu-item__icon">☕</div><div class="menu-item__info"><h4>Flat White</h4><p>Double espresso, velvety steamed milk. House blend.</p></div><div class="menu-item__price">£3.20</div></div>
          <div class="menu-item"><div class="menu-item__icon">🥛</div><div class="menu-item__info"><h4>Cappuccino</h4><p>Espresso, foamed milk, cocoa dusting. Served large.</p></div><div class="menu-item__price">£3.50</div></div>
          <div class="menu-item"><div class="menu-item__icon">🍊</div><div class="menu-item__info"><h4>Fresh Orange Juice</h4><p>Freshly squeezed orange juice. Served chilled.</p></div><div class="menu-item__price">£2.95</div></div>
          <div class="menu-item"><div class="menu-item__icon">🍫</div><div class="menu-item__info"><h4>Hot Chocolate</h4><p>Real Belgian chocolate, steamed milk, whipped cream</p></div><div class="menu-item__price">£3.75</div></div>
        </div>

        <div style="text-align:center;margin-top:40px">
          <NuxtLink to="/order" class="btn btn-primary btn--lg">Order Online for Collection</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Catering — Notion form card + editorial -->
    <section id="catering" class="section section--white">
      <div class="container">
        <div style="text-align:center;max-width:680px;margin:0 auto 56px">
          <span class="eyebrow" style="justify-content:center">Catering &amp; Hampers</span>
          <h2>Bespoke Catering &amp; Gift Hampers</h2>
          <p class="lead" style="margin:20px auto 0">Whether you're planning a corporate event, private celebration, or looking for the perfect gift, Barbakan creates bespoke catering selections and artisan food hampers tailored to your needs.</p>
        </div>
        <div class="grid grid--2" style="margin-bottom:48px">
          <div class="deli-pillar">
            <div class="deli-pillar__label">Events</div>
            <h3>Corporate &amp; Private Catering</h3>
            <p>Bespoke deli platters, continental breakfast selections, sandwich boards, and afternoon tea arrangements for business meetings, conferences, weddings, and celebrations.</p>
          </div>
          <div class="deli-pillar">
            <div class="deli-pillar__label">Gifts</div>
            <h3>Artisan Food Hampers</h3>
            <p>Beautifully packaged hampers featuring our award-winning breads, continental cheeses, charcuterie, preserves, and seasonal specials. Perfect for corporate gifts.</p>
          </div>
        </div>

        <div class="form-card">
          <h3 style="margin-bottom:24px;text-align:center">Enquiry Form</h3>
          <form @submit.prevent="handleCateringSubmit">
            <div class="form-row">
              <div class="form-group"><label class="form-label">Your Name *</label><input class="form-input" v-model="cateringForm.name" required placeholder="Jane Smith" /></div>
              <div class="form-group"><label class="form-label">Email Address *</label><input class="form-input" type="email" v-model="cateringForm.email" required placeholder="jane@example.com" /></div>
            </div>
            <div class="form-group">
              <label class="form-label">Enquiry Type</label>
              <select class="form-select" v-model="cateringForm.type"><option value="">Please select...</option><option>Corporate Catering</option><option>Private Event</option><option>Artisan Hamper</option><option>Wholesale</option><option>Other</option></select>
            </div>
            <div class="form-group">
              <label class="form-label">Tell Us About Your Requirements</label>
              <textarea class="form-textarea" v-model="cateringForm.message" placeholder="Number of guests, dietary requirements, preferred delivery location, etc."></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn--full btn--lg">Send Enquiry</button>
            <p v-if="cateringSent" class="auth-success" style="margin-top:16px;text-align:center">Thank you! We've received your enquiry and will be in touch shortly. (Demo — connect to email service)</p>
          </form>
        </div>
      </div>
    </section>

    <!-- Locations — Apple premium whitespace + Mastercard stadium -->
    <section id="locations" class="section section--cream">
      <div class="container">
        <div style="text-align:center;max-width:680px;margin:0 auto 56px">
          <span class="eyebrow" style="justify-content:center">Visit Us</span>
          <h2>Find Your Nearest Barbakan</h2>
          <p class="lead" style="margin:20px auto 0">Two locations across Greater Manchester, each offering the full Barbakan experience — fresh bread daily, our deli counter, and a welcoming cafe atmosphere.</p>
        </div>

        <div class="locations-grid">
          <div class="location-card">
            <div class="map-placeholder">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Chorlton, Manchester
            </div>
            <h3 class="location-name">Chorlton</h3>
            <p class="location-address">67-71 Manchester Road<br>Chorlton-cum-Hardy<br>Manchester, M21 9PW</p>
            <p class="location-hours"><strong>Mon–Fri 8:00am–5:30pm</strong><br>Saturday 8:30am–5:00pm<br>Sunday Closed</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">
              <a href="https://www.google.com/maps/search/Barbakan+67-71+Manchester+Road+Manchester+M21+9PW" target="_blank" rel="noopener" class="btn btn-primary btn--sm">Get Directions</a>
              <a href="tel:01618817053" class="btn btn-outline btn--sm">0161 881 7053</a>
            </div>
          </div>

          <div class="location-card">
            <div class="map-placeholder">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Wilmslow, Cheshire
            </div>
            <h3 class="location-name">Wilmslow</h3>
            <p class="location-address">1A Moor Lane<br>Wilmslow, SK9 6AG<br>Cheshire</p>
            <p class="location-hours"><strong>Mon–Fri 7:00am–4:30pm</strong><br>Saturday 8:00am–4:00pm<br>Sunday Closed</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">
              <a href="https://www.google.com/maps/search/Barbakan+1A+Moor+Lane+Wilmslow+SK9+6AG" target="_blank" rel="noopener" class="btn btn-primary btn--sm">Get Directions</a>
              <a href="tel:01618817053" class="btn btn-outline btn--sm">0161 881 7053</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const activeTab = ref('sizzlers')
const cateringForm = reactive({ name: '', email: '', type: '', message: '' })
const cateringSent = ref(false)

const handleCateringSubmit = () => {
  if (!cateringForm.name || !cateringForm.email) return
  cateringSent.value = true
  setTimeout(() => {
    cateringForm.name = ''
    cateringForm.email = ''
    cateringForm.type = ''
    cateringForm.message = ''
    cateringSent.value = false
  }, 5000)
}

useHead({
  title: 'Barbakan Delicatessen & Bakery | Manchester Since 1964',
  meta: [
    { name: 'description', content: 'Award-winning artisan bakery & continental deli in Chorlton and Wilmslow. 62 years of authentic, handmade baking. German Norlander, sourdough, bagels, ciabatta sizzlers.' }
  ]
})
</script>

<style>
@media(min-width:981px){.hero-visual{display:block!important}}
@media(max-width:980px){.home .hero>div>div{grid-template-columns:1fr!important}}
</style>
