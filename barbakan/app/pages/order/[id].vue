<template>
  <div class="product-detail-page" v-if="product">
    <div class="container">
      <NuxtLink to="/order" class="back-link">&larr; Back to Menu</NuxtLink>
      <div class="product-detail">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="product-detail-image" />
        </div>
        <div class="product-detail-info">
          <span class="product-category">{{ product.category }}</span>
          <h1>{{ product.name }}</h1>
          <p class="product-detail-description">{{ product.description }}</p>
          <p class="product-detail-price">${{ product.price.toFixed(2) }}</p>
          <div class="quantity-selector">
            <button @click="quantity > 1 && quantity--">-</button>
            <input type="number" v-model="quantity" min="1" />
            <button @click="quantity++">+</button>
          </div>
          <button @click="addToCart" class="btn btn-primary btn-lg btn-block">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container">
    <p>Loading...</p>
  </div>
</template>

<script setup>
const route = useRoute()
const cart = useCart()
const quantity = ref(1)

const { data: product } = await useFetch(`/api/products/${route.params.id}`)

const addToCart = () => {
  if (product.value) {
    for (let i = 0; i < quantity.value; i++) {
      cart.add(product.value)
    }
    quantity.value = 1
  }
}

useHead({ title: computed(() => product.value ? `${product.value.name} - Barbakan` : 'Product') })
</script>
