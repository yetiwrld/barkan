<template>
  <div class="order-layout">
    <div class="order-header">
      <div class="container order-header__inner">
        <NuxtLink to="/order" class="order-header__back">← Back to Menu</NuxtLink>
        <div class="order-header__brand">Barbakan Order<span>Product Details</span></div>
        <button class="cart-link" @click="openCart">
          Cart
          <span v-if="cart.itemCount.value > 0" class="cart-badge">{{ cart.itemCount.value }}</span>
        </button>
      </div>
    </div>

    <div class="container">
      <div v-if="pending" class="loading-spinner"></div>

      <div v-else-if="!product" class="empty-state" style="padding:80px 24px">
        <h3>Product not found</h3>
        <p>This product may no longer be available</p>
        <NuxtLink to="/order" class="btn btn-primary btn--sm" style="margin-top:12px">Browse Products</NuxtLink>
      </div>

      <div v-else class="product-detail">
        <div class="product-detail__media">
          <img :src="product.image" :alt="product.name" />
          <span v-if="product.badge" style="position:absolute;top:16px;left:16px;background:var(--gold-tint);color:var(--gold-dark);font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:6px 12px;border-radius:9999px;border:1px solid rgba(200,149,26,.25)">{{ product.badge }}</span>
        </div>
        <div>
          <div class="product-detail__category">{{ product.category }}</div>
          <h1 class="product-detail__title">{{ product.name }}</h1>
          <p class="product-detail__desc">{{ product.description }}</p>
          <div class="product-detail__price">£{{ product.price.toFixed(2) }}</div>

          <div class="qty-selector">
            <button class="qty-btn" @click="quantity > 1 && quantity--" aria-label="Decrease quantity">−</button>
            <span class="qty-value">{{ quantity }}</span>
            <button class="qty-btn" @click="quantity < 99 && quantity++" aria-label="Increase quantity">+</button>
            <span style="margin-left:8px;font-size:.85rem;color:var(--text-muted)">× £{{ product.price.toFixed(2) }} = £{{ (product.price * quantity).toFixed(2) }}</span>
          </div>

          <button @click="addToCart" class="btn btn-primary btn--lg btn--full" style="margin-bottom:12px">
            Add {{ quantity }} to Cart · £{{ (product.price * quantity).toFixed(2) }}
          </button>

          <NuxtLink to="/order" class="btn btn-outline btn--full">Continue Browsing</NuxtLink>

          <div style="margin-top:32px;padding:20px;background:var(--warm-white);border:1px solid var(--border);border-radius:12px">
            <h4 style="font-family:var(--font-body);font-size:.9rem;font-weight:600;margin-bottom:8px">Collection Information</h4>
            <p style="font-size:.85rem;color:var(--text-muted);margin:0;line-height:1.6">Freshly baked overnight and available from our counters daily. Collect from Chorlton (67-71 Manchester Road, M21 9PW) or Wilmslow (1A Moor Lane, SK9 6AG). Ready in 30-60 minutes during opening hours.</p>
          </div>

          <div v-if="related.length" style="margin-top:32px">
            <h4 style="margin-bottom:12px">You might also like</h4>
            <div style="display:grid;gap:12px">
              <div v-for="rel in related" :key="rel.id" class="product-item" @click="navigateTo(`/order/${rel.id}`)" style="cursor:pointer">
                <div class="product-item__img"><img :src="rel.image" :alt="rel.name" loading="lazy" /></div>
                <div class="product-item__info">
                  <div class="product-item__name">{{ rel.name }}</div>
                  <div class="product-item__desc">{{ rel.description }}</div>
                  <div class="product-item__footer"><span class="product-item__price">£{{ rel.price.toFixed(2) }}</span><span class="add-btn">View</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const cart = useCart()
const quantity = ref(1)

const { data: product, pending } = await useFetch(`/api/products/${route.params.id}`)
const { data: allProducts } = await useFetch('/api/products')

const related = computed(() => {
  if (!allProducts.value || !product.value) return []
  return allProducts.value.filter(p => p.category === product.value.category && p.id !== product.value.id).slice(0, 3)
})

const addToCart = () => {
  if (product.value) {
    cart.add(product.value, quantity.value)
    quantity.value = 1
    openCart()
  }
}

const openCart = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-cart'))
  }
}

useHead({
  title: computed(() => product.value ? `${product.value.name} — Barbakan` : 'Product — Barbakan')
})
</script>
