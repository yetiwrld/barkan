<template>
  <div class="checkout-layout">
    <div class="container" style="max-width:720px">
      <div v-if="pending" class="loading-spinner"></div>

      <div v-else-if="error" class="empty-state" style="background:var(--white);border:1px solid var(--border);border-radius:16px;padding:64px 24px">
        <h3>Order not found</h3>
        <p>{{ error.statusMessage || 'This order could not be found' }}</p>
        <NuxtLink to="/order" class="btn btn-primary" style="margin-top:16px">Browse Products</NuxtLink>
      </div>

      <div v-else-if="order" style="background:var(--white);border:1px solid var(--border);border-radius:20px;padding:clamp(24px,5vw,40px);box-shadow:var(--shadow-lg)">
        <div style="text-align:center;margin-bottom:32px">
          <div style="width:64px;height:64px;border-radius:50%;background:var(--success-tint);color:var(--success);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;border:1px solid rgba(61,122,74,.2)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h1 style="font-size:clamp(1.6rem,3vw,2.2rem);margin-bottom:8px">Thank you — order confirmed!</h1>
          <p style="color:var(--text-muted)">Your order <strong style="color:var(--dark)">#{{ order.id }}</strong> has been received. We'll have it ready for collection shortly.</p>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">
          <div style="background:var(--cream);border:1px solid var(--border);border-radius:12px;padding:16px">
            <div style="font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Order Number</div>
            <div style="font-weight:700">#{{ order.id }}</div>
            <div style="font-size:.8rem;color:var(--text-muted);margin-top:4px">{{ new Date(order.created_at).toLocaleString('en-GB') }}</div>
          </div>
          <div style="background:var(--cream);border:1px solid var(--border);border-radius:12px;padding:16px">
            <div style="font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Status</div>
            <span :class="['order-card__status', `status-${order.status}`]" style="display:inline-flex">{{ order.status }}</span>
            <div style="font-size:.8rem;color:var(--text-muted);margin-top:8px">Total: <strong style="color:var(--primary)">£{{ order.total.toFixed(2) }}</strong></div>
          </div>
        </div>

        <div style="margin-bottom:24px">
          <h4 style="margin-bottom:12px">Items</h4>
          <div style="border:1px solid var(--border);border-radius:12px;overflow:hidden">
            <div v-for="item in order.items" :key="item.id" style="display:flex;gap:12px;padding:12px 16px;border-bottom:1px solid var(--border-light);align-items:center">
              <div style="width:48px;height:48px;border-radius:8px;overflow:hidden;background:var(--cream-warm);flex-shrink:0">
                <img v-if="item.image" :src="item.image" :alt="item.name" style="width:100%;height:100%;object-fit:cover" />
              </div>
              <div style="flex:1">
                <div style="font-weight:600;font-size:.9rem">{{ item.name }}</div>
                <div style="font-size:.8rem;color:var(--text-muted)">Qty {{ item.quantity }} × £{{ item.price.toFixed(2) }}</div>
              </div>
              <div style="font-weight:700">£{{ (item.price * item.quantity).toFixed(2) }}</div>
            </div>
            <div style="display:flex;justify-content:space-between;padding:16px;font-weight:700;background:var(--warm-white)">
              <span>Total</span><span>£{{ order.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <div style="background:var(--cream-warm);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:24px">
          <h4 style="font-family:var(--font-body);font-size:.9rem;font-weight:600;margin-bottom:8px">Collection Details</h4>
          <p style="font-size:.875rem;color:var(--text-muted);margin:0;line-height:1.6">
            <strong style="color:var(--dark)">{{ order.customer_name }}</strong><br>
            {{ order.customer_email }}<br>
            <span v-if="order.customer_phone">{{ order.customer_phone }}<br></span>
            {{ order.delivery_address }}<br>
            <span v-if="order.notes" style="display:block;margin-top:8px;font-style:italic">Note: {{ order.notes }}</span>
          </p>
        </div>

        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <NuxtLink to="/order" class="btn btn-outline">Order Again</NuxtLink>
          <NuxtLink to="/account" class="btn btn-primary">View My Orders</NuxtLink>
          <NuxtLink to="/" class="btn btn-ghost">Back to Home</NuxtLink>
        </div>

        <p style="font-size:.78rem;color:var(--text-muted);text-align:center;margin-top:32px;line-height:1.5">Collection only — no delivery fee. Please collect during opening hours. If you have any questions, call 0161 881 7053.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const auth = useAuth()

const orderId = computed(() => route.params.id)

const { data: order, pending, error } = await useFetch(() => `/api/orders/${orderId.value}`, {
  query: computed(() => ({
    userId: auth.user.value?.id || undefined
  })),
  headers: computed(() => {
    const h = {}
    if (auth.user.value?.id) h['x-user-id'] = String(auth.user.value.id)
    return h
  })
})

useHead({
  title: computed(() => order.value ? `Order #${order.value.id} Confirmed — Barbakan` : 'Order Confirmation — Barbakan')
})
</script>
