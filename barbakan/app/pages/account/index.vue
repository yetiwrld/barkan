<template>
  <div class="account-layout">
    <div class="container">
      <div v-if="!auth.isLoggedIn.value" class="empty-state" style="background:var(--white);border:1px solid var(--border);border-radius:16px;padding:64px 24px;max-width:560px;margin:0 auto">
        <h3>Please log in to view your account</h3>
        <p>Track your orders, reorder favourites, and manage your details</p>
        <div style="display:flex;gap:12px;justify-content:center;margin-top:20px;flex-wrap:wrap">
          <NuxtLink to="/account/login" class="btn btn-primary">Log In</NuxtLink>
          <NuxtLink to="/account/register" class="btn btn-outline">Create Account</NuxtLink>
          <NuxtLink to="/order" class="btn btn-ghost">Order as Guest</NuxtLink>
        </div>
      </div>

      <div v-else class="account-grid">
        <div class="account-sidebar">
          <div class="account-sidebar__user">
            <div class="account-sidebar__avatar">{{ auth.user.value?.name?.[0]?.toUpperCase() || 'U' }}</div>
            <div>
              <div class="account-sidebar__name">{{ auth.user.value?.name }}</div>
              <div class="account-sidebar__email">{{ auth.user.value?.email }}</div>
            </div>
          </div>
          <nav class="account-nav">
            <a class="active">📦 My Orders</a>
            <a @click="handleLogout" style="cursor:pointer">🚪 Logout</a>
          </nav>
          <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border-light)">
            <div style="font-size:.8rem;color:var(--text-muted);line-height:1.5">
              <strong style="color:var(--dark)">Chorlton</strong><br>67-71 Manchester Road<br>M21 9PW<br><br>
              <strong style="color:var(--dark)">Wilmslow</strong><br>1A Moor Lane<br>SK9 6AG
            </div>
          </div>
        </div>

        <div class="account-content">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:24px">
            <h2 style="margin:0">My Orders</h2>
            <NuxtLink to="/order" class="btn btn-primary btn--sm">Order Again</NuxtLink>
          </div>

          <div v-if="pending" class="loading-spinner"></div>

          <div v-else-if="orders && orders.length" class="orders-list">
            <div v-for="order in orders" :key="order.id" class="order-card">
              <div class="order-card__header">
                <span class="order-card__id">Order #{{ order.id }}</span>
                <span :class="['order-card__status', `status-${order.status}`]">{{ order.status }}</span>
              </div>
              <div class="order-card__date">{{ new Date(order.created_at).toLocaleString('en-GB') }} · {{ order.delivery_address }}</div>
              <div class="order-card__items">
                <div v-for="it in order.items" :key="it.id" style="display:flex;justify-content:space-between;gap:8px">
                  <span>{{ it.name }} × {{ it.quantity }}</span>
                  <span>£{{ (it.price * it.quantity).toFixed(2) }}</span>
                </div>
              </div>
              <div class="order-card__total">Total: £{{ order.total.toFixed(2) }}</div>
              <div style="margin-top:12px;display:flex;gap:8px">
                <NuxtLink :to="`/order/confirmation/${order.id}`" class="btn btn-outline btn--sm">View Details</NuxtLink>
              </div>
            </div>
          </div>

          <div v-else class="empty-state">
            <h3>No orders yet</h3>
            <p>Your delicious Barbakan orders will appear here</p>
            <NuxtLink to="/order" class="btn btn-primary btn--sm" style="margin-top:12px">Browse Products</NuxtLink>
          </div>

          <div style="margin-top:32px;padding-top:20px;border-top:1px solid var(--border-light);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
            <button @click="handleLogout" class="btn btn-ghost btn--sm">Logout</button>
            <span style="font-size:.8rem;color:var(--text-muted)">Logged in as {{ auth.user.value?.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()
const router = useRouter()

const { data: orders, pending, refresh } = await useFetch('/api/orders', {
  query: computed(() => ({ userId: auth.user.value?.id })),
  headers: computed(() => {
    const h = {}
    if (auth.user.value?.id) h['x-user-id'] = String(auth.user.value.id)
    return h
  }),
  watch: [() => auth.user.value?.id]
})

const handleLogout = () => {
  auth.logout()
  router.push('/')
}

useHead({ title: 'My Account — Barbakan' })
</script>
