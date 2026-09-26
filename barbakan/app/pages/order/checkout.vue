<template>
  <div class="checkout-layout">
    <div class="container">
      <NuxtLink to="/order" class="order-header__back" style="margin-bottom:20px;display:inline-flex">← Back to Order</NuxtLink>

      <div v-if="cart.items.value.length === 0" class="empty-state" style="background:var(--white);border:1px solid var(--border);border-radius:16px;padding:64px 24px">
        <h3>Your cart is empty</h3>
        <p>Add some delicious breads and sizzlers to get started</p>
        <NuxtLink to="/order" class="btn btn-primary" style="margin-top:16px">Browse Products</NuxtLink>
      </div>

      <div v-else class="checkout-grid">
        <div>
          <div class="checkout-section">
            <h3>Collection Details</h3>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input class="form-input" v-model="form.name" placeholder="Jane Smith" :class="{ 'form-input--error': errors.name }" />
                <div v-if="errors.name" class="form-error">{{ errors.name }}</div>
              </div>
              <div class="form-group">
                <label class="form-label">Email Address *</label>
                <input class="form-input" type="email" v-model="form.email" placeholder="jane@example.com" :class="{ 'form-input--error': errors.email }" />
                <div v-if="errors.email" class="form-error">{{ errors.email }}</div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Phone (for collection updates)</label>
                <input class="form-input" v-model="form.phone" placeholder="07..." />
              </div>
              <div class="form-group">
                <label class="form-label">Preferred Location</label>
                <select class="form-select" v-model="form.location">
                  <option value="Chorlton">Chorlton — 67-71 Manchester Road</option>
                  <option value="Wilmslow">Wilmslow — 1A Moor Lane</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Collection Notes (optional)</label>
              <textarea class="form-textarea" v-model="form.notes" placeholder="e.g. Collect after 2pm, allergy info, etc." rows="3"></textarea>
            </div>
          </div>

          <div class="checkout-section">
            <h3>Account (optional but recommended)</h3>
            <p style="font-size:.875rem;color:var(--text-muted);margin-bottom:16px">Create an account or log in to track your orders and reorder quickly. You can also checkout as guest.</p>
            <div v-if="!auth.isLoggedIn.value" style="display:flex;gap:8px;flex-wrap:wrap">
              <NuxtLink to="/account/login?redirect=/order/checkout" class="btn btn-outline btn--sm">Login</NuxtLink>
              <NuxtLink to="/account/register?redirect=/order/checkout" class="btn btn-ghost btn--sm">Create Account</NuxtLink>
            </div>
            <div v-else style="display:flex;align-items:center;gap:12px;background:var(--success-tint);border:1px solid rgba(61,122,74,.2);padding:12px 16px;border-radius:8px">
              <div style="width:32px;height:32px;border-radius:50%;background:var(--success);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem">{{ auth.user.value?.name?.[0] || 'U' }}</div>
              <div><div style="font-weight:600;font-size:.9rem">{{ auth.user.value?.name }}</div><div style="font-size:.8rem;color:var(--text-muted)">{{ auth.user.value?.email }}</div></div>
            </div>
          </div>
        </div>

        <div class="order-summary">
          <h3>Order Summary</h3>
          <div class="order-summary__items">
            <div v-for="item in cart.items.value" :key="item.id" class="order-summary__item">
              <div style="flex:1">
                <div style="font-weight:600">{{ item.name }}</div>
                <div style="font-size:.8rem;color:var(--text-muted)">Qty {{ item.quantity }} × £{{ item.price.toFixed(2) }}</div>
              </div>
              <div style="font-weight:700">£{{ (item.price * item.quantity).toFixed(2) }}</div>
            </div>
          </div>
          <div style="padding:12px 0;border-top:1px dashed var(--border);border-bottom:1px dashed var(--border);margin-bottom:16px;font-size:.85rem;color:var(--text-muted);line-height:1.5">
            Collection from <strong style="color:var(--dark)">{{ form.location }}</strong><br>
            Ready in 30-60 minutes during opening hours.<br>
            No delivery fee — collection only.
          </div>
          <div class="order-summary__total">
            <span>Total to pay on collection</span>
            <span>£{{ cart.total.value.toFixed(2) }}</span>
          </div>
          <button @click="placeOrder" :disabled="submitting" class="btn btn-primary btn--full btn--lg" style="margin-top:20px">
            <span v-if="submitting">Placing order...</span>
            <span v-else>Place Order · £{{ cart.total.value.toFixed(2) }}</span>
          </button>
          <p style="font-size:.75rem;color:var(--text-muted);text-align:center;margin-top:12px;line-height:1.5">By placing your order, you agree to collect from {{ form.location }} during opening hours. Payment on collection.</p>
          <div v-if="submitError" class="alert alert-error" style="margin-top:16px">{{ submitError }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cart = useCart()
const auth = useAuth()
const router = useRouter()
const submitting = ref(false)
const submitError = ref('')

const form = reactive({
  name: '',
  email: '',
  phone: '',
  location: 'Chorlton',
  notes: ''
})

const errors = reactive({
  name: '',
  email: ''
})

onMounted(() => {
  if (auth.user.value) {
    form.name = auth.user.value.name || ''
    form.email = auth.user.value.email || ''
  } else {
    try {
      const raw = localStorage.getItem('barbakan_checkout')
      if (raw) {
        const parsed = JSON.parse(raw)
        form.name = parsed.name || ''
        form.email = parsed.email || ''
        form.phone = parsed.phone || ''
        form.location = parsed.location || 'Chorlton'
      }
    } catch {}
  }
})

const validate = () => {
  let ok = true
  errors.name = ''
  errors.email = ''
  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = 'Please enter your full name'
    ok = false
  }
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email'
    ok = false
  }
  return ok
}

const placeOrder = async () => {
  submitError.value = ''
  if (!validate()) return
  if (cart.items.value.length === 0) {
    submitError.value = 'Your cart is empty'
    return
  }
  submitting.value = true
  try {
    // Persist checkout info for guest
    if (typeof window !== 'undefined') {
      localStorage.setItem('barbakan_checkout', JSON.stringify(form))
    }

    const payload = {
      items: cart.items.value.map(i => ({ id: i.id, quantity: i.quantity })),
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.location,
        notes: form.notes ? `${form.notes} | Location: ${form.location}` : `Location: ${form.location}`
      },
      user: auth.user.value ? { id: auth.user.value.id, email: auth.user.value.email } : null
    }

    const res = await $fetch('/api/orders', {
      method: 'POST',
      body: payload
    })

    if (res.success && res.orderId) {
      cart.clear()
      router.push(`/order/confirmation/${res.orderId}`)
    } else {
      throw new Error('Failed to place order')
    }
  } catch (e) {
    const err = e
    submitError.value = err?.data?.message || err?.message || 'Failed to place order. Please try again.'
  } finally {
    submitting.value = false
  }
}

useHead({ title: 'Checkout — Barbakan' })
</script>
