<template>
  <div class="order-layout">
    <div class="order-header">
      <div class="container order-header__inner">
        <NuxtLink to="/" class="order-header__back">← Back to Barbakan</NuxtLink>
        <div class="order-header__brand">Barbakan Order<span>Chorlton &amp; Wilmslow · Collection</span></div>
        <button class="cart-link" @click="openCart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 8h-3l-4 9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2l-4-9h-3"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>
          Cart
          <span v-if="cart.itemCount.value > 0" class="cart-badge">{{ cart.itemCount.value }}</span>
        </button>
      </div>
    </div>

    <div class="container">
      <div class="order-toolbar" style="padding:32px 0 12px">
        <div class="order-title">
          <div class="breadcrumb" style="margin-bottom:12px"><NuxtLink to="/">Home</NuxtLink><span>/</span><span>Order Online</span></div>
          <span class="eyebrow">Collection Only · Chorlton &amp; Wilmslow</span>
          <h1>Order Online</h1>
          <p>Freshly baked breads, sizzlers, pastries &amp; deli — available for collection. No delivery fees. Ready in 30-60 minutes during opening hours.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <span style="font-size:.82rem;color:var(--text-muted);background:var(--white);border:1px solid var(--border);padding:6px 12px;border-radius:9999px">{{ filteredProducts.length }} products · {{ categories.length - 1 }} categories</span>
          <button v-if="cart.items.value.length" class="btn btn-primary btn--sm" @click="openCart">View Cart · £{{ cart.total.value.toFixed(2) }}</button>
        </div>
      </div>

      <div class="category-tabs">
        <button
          v-for="cat in categories"
          :key="cat.value"
          :class="['category-tab', { active: selectedCategory === cat.value }]"
          @click="selectedCategory = cat.value"
        >
          {{ cat.label }}
        </button>
      </div>

      <div v-if="pending" class="loading-spinner"></div>

      <div v-else-if="filteredProducts.length === 0" class="empty-state">
        <h3>No products in this category</h3>
        <p>Try another category or view all products</p>
        <button class="btn btn-outline btn--sm" @click="selectedCategory = ''">Show All</button>
      </div>

      <div v-else class="product-list">
        <div v-for="product in filteredProducts" :key="product.id" class="product-item" @click="goToProduct(product.id)">
          <div class="product-item__img">
            <img :src="product.image" :alt="product.name" loading="lazy" />
          </div>
          <div class="product-item__info">
            <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
              <div class="product-item__name">{{ product.name }}</div>
              <span v-if="product.badge" style="font-size:.6rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;background:var(--gold-tint);color:var(--gold-dark);padding:2px 6px;border-radius:9999px;border:1px solid rgba(200,149,26,.2)">{{ product.badge }}</span>
            </div>
            <div class="product-item__desc">{{ product.description }}</div>
            <div class="product-item__footer">
              <span class="product-item__price">£{{ product.price.toFixed(2) }}</span>
              <button class="add-btn" @click.stop="addToCart(product)">+ Add</button>
            </div>
          </div>
        </div>
      </div>

      <div style="margin:40px 0 64px;padding:24px;background:var(--warm-white);border:1px solid var(--border);border-radius:16px;display:flex;gap:16px;align-items:center;flex-wrap:wrap">
        <div style="flex:1;min-width:240px">
          <h4 style="margin-bottom:4px">Collection only — Chorlton &amp; Wilmslow</h4>
          <p style="font-size:.875rem;color:var(--text-muted);margin:0">Order online and collect fresh from our counters. No delivery fees. Ready in 30-60 minutes during opening hours. Saturday sausage pan available 9am until sold out.</p>
        </div>
        <NuxtLink to="/#locations" class="btn btn-outline btn--sm">Opening Hours</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const cart = useCart()
const router = useRouter()
const selectedCategory = ref('')
const { data: products, pending } = await useFetch('/api/products')

const categories = [
  { label: 'All', value: '' },
  { label: 'Breads', value: 'breads' },
  { label: 'Bagels', value: 'bagels' },
  { label: 'Pastries', value: 'pastries' },
  { label: 'Sizzlers', value: 'sizzlers' },
  { label: 'Deli', value: 'deli' },
  { label: 'Soups', value: 'soups' },
  { label: 'Cakes', value: 'cakes' },
  { label: 'Drinks', value: 'drinks' }
]

const filteredProducts = computed(() => {
  if (!products.value) return []
  if (!selectedCategory.value) return products.value
  return products.value.filter(p => p.category === selectedCategory.value)
})

const addToCart = (product) => {
  cart.add(product, 1)
  // Haptic-ish feedback: open cart if first item
  if (cart.itemCount.value === 1) {
    openCart()
  }
}

const goToProduct = (id) => {
  router.push(`/order/${id}`)
}

const openCart = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-cart'))
  }
}

useHead({
  title: 'Order Online — Barbakan Delicatessen & Bakery',
  meta: [
    { name: 'description', content: 'Order fresh artisan breads, bagels, pastries, ciabatta sizzlers and deli platters for collection from Barbakan Chorlton and Wilmslow.' }
  ]
})
</script>
