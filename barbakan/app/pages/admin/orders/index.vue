<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:24px">
      <div>
        <span class="eyebrow">Admin · Orders</span>
        <h1 style="font-size:clamp(1.8rem,3vw,2.4rem)">Orders</h1>
      </div>
      <NuxtLink to="/admin" class="btn btn-ghost btn--sm">← Dashboard</NuxtLink>
    </div>

    <!-- Filters -->
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px">
      <button v-for="s in statuses" :key="s" @click="filterStatus = s" :class="['btn', filterStatus===s ? 'btn-primary' : 'btn-outline', 'btn--sm']">{{ s }}</button>
    </div>

    <div v-if="pending" class="loading-spinner"></div>

    <div v-else-if="!orders || orders.length===0" class="empty-state">
      <div class="empty-state__icon">📦</div>
      <h3>No orders</h3>
      <p>No orders matching filter "{{ filterStatus }}"</p>
    </div>

    <div v-else style="display:grid;gap:16px">
      <div v-for="order in orders" :key="order.id" style="background:var(--white);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:var(--shadow-xs)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <span style="font-family:var(--font-display);font-weight:700;font-size:1.1rem">#{{ order.id }}</span>
              <span :class="['order-card__status', `status-${order.status}`]">{{ order.status }}</span>
              <span style="font-size:.8rem;color:var(--text-muted)">{{ new Date(order.created_at).toLocaleString('en-GB') }}</span>
            </div>
            <div style="margin-top:8px;font-size:.9rem">
              <strong>{{ order.customer_name }}</strong> · {{ order.customer_email }} · {{ order.customer_phone }}
            </div>
            <div v-if="order.user" style="font-size:.8rem;color:var(--text-muted)">Account: {{ order.user.name }} ({{ order.user.email }})</div>
            <div v-if="order.notes" style="margin-top:8px;font-size:.85rem;background:var(--warm-white);padding:8px 12px;border-radius:8px;border:1px solid var(--border-light)">Notes: {{ order.notes }}</div>
          </div>
          <div style="text-align:right">
            <div style="font-family:var(--font-display);font-weight:700;font-size:1.2rem">£{{ order.total.toFixed(2) }}</div>
            <div style="font-size:.8rem;color:var(--text-muted)">{{ order.itemCount }} items · {{ order.pickup_location || order.delivery_address || 'Chorlton' }}</div>
            <div style="font-size:.8rem;color:var(--text-muted)">Pickup: {{ order.pickup_time ? new Date(order.pickup_time).toLocaleString('en-GB') : 'Collection during hours' }}</div>
          </div>
        </div>

        <!-- Items -->
        <div style="margin-top:16px;display:grid;gap:8px">
          <div v-for="item in order.items" :key="item.id" style="display:flex;gap:12px;align-items:center;padding:8px 0;border-top:1px solid var(--border-light)">
            <img :src="item.image" :alt="item.name" style="width:40px;height:40px;border-radius:8px;object-fit:cover;background:var(--warm-white)">
            <div style="flex:1">
              <div style="font-weight:600;font-size:.9rem">{{ item.name }}</div>
              <div style="font-size:.8rem;color:var(--text-muted)">£{{ item.price.toFixed(2) }} × {{ item.quantity }}</div>
            </div>
            <div style="font-weight:700;font-size:.9rem">£{{ (item.price * item.quantity).toFixed(2) }}</div>
          </div>
        </div>

        <!-- Status update -->
        <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;align-items:center">
          <span style="font-size:.8rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em">Update status:</span>
          <button v-for="s in statusOptions" :key="s" @click="updateStatus(order.id, s)" :disabled="order.status===s || updatingId===order.id" :class="['btn','btn--sm', order.status===s ? 'btn-primary' : 'btn-outline']" style="min-width:80px">
            {{ updatingId===order.id ? '…' : s }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const auth = useAuth()
const filterStatus = ref('all')
const statuses = ['all','pending','confirmed','preparing','ready','completed','cancelled']
const statusOptions = ['pending','confirmed','preparing','ready','completed','cancelled']
const updatingId = ref(null)

const { data: orders, pending, refresh } = await useFetch('/api/admin/orders', {
  query: computed(() => ({ status: filterStatus.value })),
  headers: computed(() => {
    const h = {}
    if (auth.user.value?.id) h['x-user-id'] = String(auth.user.value.id)
    return h
  }),
  watch: [filterStatus]
})

watch(filterStatus, () => refresh())

async function updateStatus(orderId, newStatus) {
  updatingId.value = orderId
  try {
    await $fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: auth.user.value?.id ? { 'x-user-id': String(auth.user.value.id) } : {},
      body: { status: newStatus }
    })
    await refresh()
  } catch (e) {
    alert(e?.data?.message || 'Failed to update status')
  } finally {
    updatingId.value = null
  }
}

useHead({ title: 'Admin Orders — Barbakan' })
</script>
