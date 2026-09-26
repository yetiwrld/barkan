<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:32px">
      <div>
        <span class="eyebrow">Admin Portal</span>
        <h1 style="font-size:clamp(1.8rem,3vw,2.4rem)">Dashboard</h1>
        <p style="color:var(--text-muted);margin-top:8px">Overview of Barbakan orders, products and customers</p>
      </div>
      <div style="display:flex;gap:8px">
        <NuxtLink to="/admin/orders" class="btn btn-primary btn--sm">View Orders</NuxtLink>
        <NuxtLink to="/admin/products" class="btn btn-outline btn--sm">Manage Products</NuxtLink>
      </div>
    </div>

    <div v-if="pending" class="loading-spinner"></div>

    <div v-else-if="stats" style="display:grid;gap:20px">
      <!-- Stats grid -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
        <div style="background:var(--white);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:var(--shadow-xs)">
          <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px">Total Orders</div>
          <div style="font-family:var(--font-display);font-size:2rem;font-weight:700;line-height:1">{{ stats.totalOrders }}</div>
          <div style="font-size:.8rem;color:var(--text-muted);margin-top:6px">{{ stats.todayOrders }} today</div>
        </div>
        <div style="background:var(--white);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:var(--shadow-xs)">
          <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px">Pending</div>
          <div style="font-family:var(--font-display);font-size:2rem;font-weight:700;line-height:1;color:var(--warning)">{{ stats.pendingOrders }}</div>
          <div style="font-size:.8rem;color:var(--text-muted);margin-top:6px">Needs attention</div>
        </div>
        <div style="background:var(--white);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:var(--shadow-xs)">
          <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px">Revenue (all time)</div>
          <div style="font-family:var(--font-display);font-size:2rem;font-weight:700;line-height:1">£{{ stats.totalRevenue.toFixed(2) }}</div>
          <div style="font-size:.8rem;color:var(--text-muted);margin-top:6px">Collection only</div>
        </div>
        <div style="background:var(--white);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:var(--shadow-xs)">
          <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px">Products</div>
          <div style="font-family:var(--font-display);font-size:2rem;font-weight:700;line-height:1">{{ stats.activeProducts }}/{{ stats.totalProducts }}</div>
          <div style="font-size:.8rem;color:var(--text-muted);margin-top:6px">Active / Total</div>
        </div>
      </div>

      <!-- Recent orders -->
      <div style="background:var(--white);border:1px solid var(--border);border-radius:16px;padding:24px;box-shadow:var(--shadow-xs)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <h3 style="margin:0">Recent Orders</h3>
          <NuxtLink to="/admin/orders" class="btn btn-ghost btn--sm">View all →</NuxtLink>
        </div>
        <div v-if="stats.recentOrders.length === 0" class="empty-state" style="padding:24px">
          <p>No orders yet</p>
        </div>
        <div v-else style="display:grid;gap:12px">
          <div v-for="order in stats.recentOrders" :key="order.id" style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border:1px solid var(--border-light);border-radius:12px;background:var(--warm-white)">
            <div>
              <div style="font-weight:700">#{{ order.id }} · {{ order.customer_name }}</div>
              <div style="font-size:.8rem;color:var(--text-muted)">{{ new Date(order.created_at).toLocaleString('en-GB') }} · {{ order.itemCount }} items</div>
            </div>
            <div style="text-align:right">
              <span :class="['order-card__status', `status-${order.status}`]">{{ order.status }}</span>
              <div style="font-weight:700;margin-top:4px">£{{ order.total.toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick actions -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div style="background:var(--warm-white);border:1px solid var(--border);border-radius:16px;padding:20px">
          <h4 style="margin-bottom:8px">Product Management</h4>
          <p style="font-size:.875rem;color:var(--text-muted);margin-bottom:12px">Add new breads, update prices, toggle availability. Changes persist and affect ordering immediately.</p>
          <NuxtLink to="/admin/products" class="btn btn-outline btn--sm">Manage Products</NuxtLink>
        </div>
        <div style="background:var(--warm-white);border:1px solid var(--border);border-radius:16px;padding:20px">
          <h4 style="margin-bottom:8px">Order Fulfillment</h4>
          <p style="font-size:.875rem;color:var(--text-muted);margin-bottom:12px">View incoming orders, update status from pending → confirmed → preparing → ready → completed.</p>
          <NuxtLink to="/admin/orders" class="btn btn-outline btn--sm">Manage Orders</NuxtLink>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-error">Failed to load stats — ensure you are logged in as admin (admin@barbakan.co.uk)</div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const auth = useAuth()

const { data: stats, pending } = await useFetch('/api/admin/stats', {
  headers: computed(() => {
    const h = {}
    if (auth.user.value?.id) h['x-user-id'] = String(auth.user.value.id)
    return h
  })
})

useHead({ title: 'Admin Dashboard — Barbakan' })
</script>
