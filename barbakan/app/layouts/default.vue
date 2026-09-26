<template>
  <div class="layout">
    <header class="site-header" :class="{ scrolled: isScrolled }">
      <div class="container site-header__inner">
        <NuxtLink to="/" class="site-logo">
          <span class="site-logo__name">Barbakan</span>
          <span class="site-logo__tag">Delicatessen &amp; Bakery</span>
        </NuxtLink>

        <nav class="site-nav" aria-label="Main navigation">
          <NuxtLink to="/#story">Our Story</NuxtLink>
          <NuxtLink to="/#bakery">Bakery</NuxtLink>
          <NuxtLink to="/#deli">Deli</NuxtLink>
          <NuxtLink to="/#pan">Saturday</NuxtLink>
          <NuxtLink to="/order">Order</NuxtLink>
          <template v-if="auth.isLoggedIn.value">
            <NuxtLink to="/account">Account</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/account/login">Login</NuxtLink>
          </template>
          <NuxtLink to="/#locations" class="btn btn-primary btn--sm site-nav__cta">Visit Us</NuxtLink>
        </nav>

        <div class="site-header__actions">
          <NuxtLink to="/order" class="cart-link" aria-label="View cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 8h-3l-4 9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2l-4-9h-3"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>
            <span class="hide-mobile">Cart</span>
            <span v-if="cart.itemCount.value > 0" class="cart-badge">{{ cart.itemCount.value }}</span>
          </NuxtLink>

          <button class="nav-toggle" @click="mobileOpen = !mobileOpen" :aria-expanded="mobileOpen.toString()" aria-label="Toggle menu">
            <span :style="mobileOpen ? 'transform:rotate(45deg) translate(5px,5px)' : ''"></span>
            <span :style="mobileOpen ? 'opacity:0' : ''"></span>
            <span :style="mobileOpen ? 'transform:rotate(-45deg) translate(5px,-5px)' : ''"></span>
          </button>
        </div>
      </div>
    </header>

    <nav class="mobile-nav" :class="{ open: mobileOpen }" aria-label="Mobile navigation">
      <NuxtLink to="/#story" @click="mobileOpen = false">Our Story</NuxtLink>
      <NuxtLink to="/#bakery" @click="mobileOpen = false">The Bakery</NuxtLink>
      <NuxtLink to="/#deli" @click="mobileOpen = false">The Deli</NuxtLink>
      <NuxtLink to="/#pan" @click="mobileOpen = false">Saturday Pan</NuxtLink>
      <NuxtLink to="/order" @click="mobileOpen = false">Order Online</NuxtLink>
      <template v-if="auth.isLoggedIn.value">
        <NuxtLink to="/account" @click="mobileOpen = false">My Account</NuxtLink>
        <button class="btn btn-ghost" @click="handleLogout">Logout</button>
      </template>
      <template v-else>
        <NuxtLink to="/account/login" @click="mobileOpen = false">Login</NuxtLink>
        <NuxtLink to="/account/register" @click="mobileOpen = false">Create Account</NuxtLink>
      </template>
      <NuxtLink to="/#locations" class="btn btn-primary btn--full" @click="mobileOpen = false">Visit Us — Chorlton &amp; Wilmslow</NuxtLink>
    </nav>

    <main class="main">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <NuxtLink to="/" class="site-logo">
              <span class="site-logo__name">Barbakan</span>
              <span class="site-logo__tag">Delicatessen &amp; Bakery</span>
            </NuxtLink>
            <p>Authentic artisan bakery and continental deli serving Manchester since 1964. Award-winning breads, exceptional deli fare, and genuine hospitality across Chorlton and Wilmslow.</p>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <NuxtLink to="/#story">Our Story</NuxtLink>
            <NuxtLink to="/#bakery">The Bakery</NuxtLink>
            <NuxtLink to="/#deli">The Deli</NuxtLink>
            <NuxtLink to="/#pan">Saturday Pan</NuxtLink>
            <NuxtLink to="/#menu">Menu</NuxtLink>
            <NuxtLink to="/order">Order Online</NuxtLink>
          </div>
          <div class="footer-col">
            <h4>Visit</h4>
            <a href="https://www.google.com/maps/search/Barbakan+67-71+Manchester+Road+Manchester+M21+9PW" target="_blank" rel="noopener">Chorlton — 67-71 Manchester Road, M21 9PW</a>
            <a href="https://www.google.com/maps/search/Barbakan+1A+Moor+Lane+Wilmslow+SK9+6AG" target="_blank" rel="noopener">Wilmslow — 1A Moor Lane, SK9 6AG</a>
            <NuxtLink to="/#locations">Opening Hours</NuxtLink>
            <NuxtLink to="/#catering">Catering &amp; Hampers</NuxtLink>
          </div>
          <div class="footer-col">
            <h4>Connect</h4>
            <a href="https://barbakan-deli.co.uk" target="_blank" rel="noopener">Main Website</a>
            <a href="https://www.facebook.com/BarbakanDeli" target="_blank" rel="noopener">Facebook</a>
            <a href="https://www.instagram.com/barbakandeli" target="_blank" rel="noopener">Instagram</a>
            <a href="tel:01618817053">0161 881 7053</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>Barbakan Delicatessen &amp; Bakery. Est. Manchester, 1964. Company No. 789549</span>
          <span>© {{ new Date().getFullYear() }} Barbakan. Crafted with care in Chorlton.</span>
        </div>
      </div>
    </footer>

    <!-- Floating Cart Frap — Starbucks signature elevation -->
    <button v-if="cart.itemCount.value > 0" class="frap-cart" @click="cartOpen = true" aria-label="Open cart">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 8h-3l-4 9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2l-4-9h-3"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>
      <span class="frap-cart__count">{{ cart.itemCount.value }}</span>
    </button>

    <!-- Cart Drawer -->
    <div class="cart-overlay" :class="{ active: cartOpen }" @click="cartOpen = false"></div>
    <div class="cart-drawer" :class="{ open: cartOpen }">
      <div class="cart-drawer__header">
        <h3 class="cart-drawer__title">Your Cart</h3>
        <button class="cart-drawer__close" @click="cartOpen = false" aria-label="Close cart">×</button>
      </div>
      <div class="cart-drawer__body">
        <div v-if="cart.items.value.length === 0" class="cart-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.3"><path d="M9 8h-3l-4 9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2l-4-9h-3"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>
          <p>Your cart is empty</p>
          <NuxtLink to="/order" class="btn btn-primary btn--sm" style="margin-top:12px" @click="cartOpen = false">Browse Products</NuxtLink>
        </div>
        <div v-else>
          <div v-for="item in cart.items.value" :key="item.id" class="cart-item">
            <div class="cart-item__img">
              <img v-if="item.image" :src="item.image" :alt="item.name" loading="lazy" />
            </div>
            <div class="cart-item__info">
              <div class="cart-item__name">{{ item.name }}</div>
              <div class="cart-item__price">£{{ item.price.toFixed(2) }} each</div>
              <div class="cart-item__qty">
                <button class="qty-btn" @click="cart.updateQuantity(item.id, item.quantity - 1)" aria-label="Decrease">−</button>
                <span>{{ item.quantity }}</span>
                <button class="qty-btn" @click="cart.updateQuantity(item.id, item.quantity + 1)" aria-label="Increase">+</button>
                <button class="cart-item__remove" @click="cart.remove(item.id)">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="cart.items.value.length > 0" class="cart-drawer__footer">
        <div class="cart-total">
          <span>Total</span>
          <span>£{{ cart.total.value.toFixed(2) }}</span>
        </div>
        <NuxtLink to="/order/checkout" class="btn btn-primary btn--full" @click="cartOpen = false">Checkout</NuxtLink>
        <button class="btn btn-ghost btn--full" style="margin-top:8px" @click="cart.clear()">Clear cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()
const cart = useCart()
const mobileOpen = ref(false)
const cartOpen = ref(false)
const isScrolled = ref(false)

const handleLogout = () => {
  auth.logout()
  mobileOpen.value = false
  navigateTo('/')
}

// Scroll listener for header
onMounted(() => {
  const onScroll = () => { isScrolled.value = window.scrollY > 12 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // expose cart drawer toggle globally
  window.addEventListener('open-cart', () => { cartOpen.value = true })
})

// Provide cart open method
provide('openCart', () => { cartOpen.value = true })
</script>

<style>
.hide-mobile{ }
@media(max-width:640px){ .hide-mobile{ display:none } }
.main{ min-height:60vh }
</style>
