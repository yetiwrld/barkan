<template>
  <div class="order-page">
    <div class="container">
      <h1>Order Online</h1>
      <p class="page-subtitle">Fresh Polish delicacies delivered to your door</p>
      
      <div class="category-filter">
        <button 
          v-for="cat in categories" 
          :key="cat.value"
          :class="['filter-btn', { active: selectedCategory === cat.value }]"
          @click="selectedCategory = cat.value"
        >
          {{ cat.label }}
        </button>
      </div>

      <div class="products-grid" v-if="products">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <NuxtLink :to="`/order/${product.id}`" class="product-image-link">
            <img :src="product.image" :alt="product.name" class="product-image" />
          </NuxtLink>
          <div class="product-info">
            <NuxtLink :to="`/order/${product.id}`" class="product-name">{{ product.name }}</NuxtLink>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-footer">
              <span class="price">${{ product.price.toFixed(2) }}</span>
              <button @click="addToCart(product)" class="btn btn-primary btn-sm">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="cart.items.length > 0" class="cart-drawer">
        <div class="cart-header">
          <h3>Your Cart ({{ cart.itemCount }} items)</h3>
          <span class="cart-total">${{ cart.total.toFixed(2) }}</span>
        </div>
        <div class="cart-items">
          <div v-for="item in cart.items" :key="item.id" class="cart-item">
            <span class="item-name">{{ item.name }} x {{ item.quantity }}</span>
            <span class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
        <div class="cart-actions">
          <button @click="cart.clear()" class="btn btn-secondary btn-sm">Clear</button>
          <button @click="showCheckout = true" class="btn btn-primary">Checkout</button>
        </div>
      </div>
    </div>

    <div v-if="showCheckout" class="modal-overlay" @click.self="showCheckout = false">
      <div class="modal">
        <h2>Checkout</h2>
        <form @submit.prevent="placeOrder">
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="form.name" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="form.email" required />
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" v-model="form.phone" />
          </div>
          <div class="form-group">
            <label>Address</label>
            <textarea v-model="form.address" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>Notes</label>
            <textarea v-model="form.notes" rows="2"></textarea>
          </div>
          <div class="form-total">
            <strong>Total: ${{ cart.total.toFixed(2) }}</strong>
          </div>
          <div class="form-actions">
            <button type="button" @click="showCheckout = false" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">Place Order</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const cart = useCart()
const showCheckout = ref(false)
const selectedCategory = ref('')
const form = reactive({ name: '', email: '', phone: '', address: '', notes: '' })

const categories = [
  { label: 'All', value: '' },
  { label: 'Pierogi', value: 'pierogi' },
  { label: 'Meals', value: 'meals' },
  { label: 'Soups', value: 'soups' },
  { label: 'Bakery', value: 'bakery' },
  { label: 'Sides', value: 'sides' }
]

const { data: products } = await useFetch('/api/products')

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return products.value
  return products.value?.filter(p => p.category === selectedCategory.value)
})

const addToCart = (product) => {
  cart.add(product)
}

const placeOrder = async () => {
  try {
    await $fetch('/api/orders', {
      method: 'POST',
      body: { items: cart.items, customer: form }
    })
    cart.clear()
    showCheckout.value = false
    alert('Order placed successfully!')
  } catch (e) {
    alert('Failed to place order')
  }
}

useHead({ title: 'Order - Barbakan Deli' })
</script>
