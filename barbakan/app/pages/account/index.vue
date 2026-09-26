<template>
  <div class="account-page">
    <div class="container">
      <h1>My Account</h1>
      <div class="account-info" v-if="auth.user.value">
        <p><strong>Name:</strong> {{ auth.user.value.name }}</p>
        <p><strong>Email:</strong> {{ auth.user.value.email }}</p>
      </div>
      <h2>My Orders</h2>
      <div v-if="orders && orders.length" class="orders-list">
        <div v-for="order in orders" :key="order.id" class="order-card">
          <p><strong>Order #{{ order.id }}</strong> - {{ order.status }} - ${{ order.total.toFixed(2) }}</p>
          <p>{{ new Date(order.created_at).toLocaleDateString() }}</p>
        </div>
      </div>
      <p v-else>No orders yet.</p>
      <button @click="handleLogout" class="btn btn-secondary">Logout</button>
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()
const router = useRouter()
const { data: orders } = await useFetch('/api/orders')
const handleLogout = () => { auth.logout(); router.push('/') }
useHead({ title: 'Account - Barbakan Deli' })
</script>
