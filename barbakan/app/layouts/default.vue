<template>
  <div class="layout">
    <header class="nav-header">
      <nav class="nav container">
        <NuxtLink to="/" class="nav-logo">Barbakan</NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/order">Order</NuxtLink>
          <template v-if="auth.isLoggedIn.value">
            <NuxtLink to="/account">Account</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/account/login">Login</NuxtLink>
          </template>
        </div>
        <div class="nav-cart">
          <NuxtLink to="/order" class="cart-link">
            <span>Cart</span>
            <span v-if="cart.itemCount.value > 0" class="cart-badge">{{ cart.itemCount.value }}</span>
          </NuxtLink>
        </div>
      </nav>
    </header>
    <main class="main">
      <slot />
    </main>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div>
            <h3>Barbakan Deli</h3>
            <p>Authentic Polish delicatessen since 1996</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Chorlton: 0161 881 7053</p>
            <p>Wilmslow: 01625 123 456</p>
          </div>
        </div>
        <p class="footer-bottom">&copy; 2025 Barbakan Deli</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const auth = useAuth()
const cart = useCart()
</script>
