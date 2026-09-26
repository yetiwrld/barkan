<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:24px">
      <div>
        <span class="eyebrow">Admin · Products</span>
        <h1 style="font-size:clamp(1.8rem,3vw,2.4rem)">Products</h1>
        <p style="color:var(--text-muted);font-size:.9rem;margin-top:4px">{{ filteredProducts.length }} of {{ products?.length || 0 }} products</p>
      </div>
      <div style="display:flex;gap:8px">
        <NuxtLink to="/admin" class="btn btn-ghost btn--sm">← Dashboard</NuxtLink>
        <button @click="showAdd = !showAdd" class="btn btn-primary btn--sm">{{ showAdd ? 'Cancel' : '+ Add Product' }}</button>
      </div>
    </div>

    <!-- Add product form -->
    <div v-if="showAdd" style="background:var(--white);border:1px solid var(--border);border-radius:16px;padding:24px;margin-bottom:24px;box-shadow:var(--shadow-xs)">
      <h3 style="margin-bottom:16px">{{ editing ? 'Edit Product #' + editing.id : 'Add New Product' }}</h3>
      <form @submit.prevent="submitProduct" style="display:grid;gap:16px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Name *</label>
            <input v-model="form.name" class="form-input" required minlength="2" maxlength="100" placeholder="Sourdough Rye">
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Price £ *</label>
            <input v-model.number="form.price" type="number" step="0.01" min="0" max="1000" class="form-input" required>
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Description *</label>
          <textarea v-model="form.description" class="form-textarea" required maxlength="500" rows="3" placeholder="Authentic Polish..."></textarea>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Category *</label>
            <select v-model="form.category" class="form-select" required>
              <option value="">Select</option>
              <option v-for="c in availableCategories" :key="c" :value="c">{{ c }}</option>
              <option value="bread">bread</option>
              <option value="pastries">pastries</option>
              <option value="deli">deli</option>
              <option value="cakes">cakes</option>
              <option value="pantry">pantry</option>
            </select>
            <input v-model="form.category" placeholder="or custom category" class="form-input" style="margin-top:8px">
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Badge (optional)</label>
            <input v-model="form.badge" class="form-input" maxlength="30" placeholder="Bestseller">
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Active</label>
            <select v-model="form.active" class="form-select">
              <option :value="1">Active</option>
              <option :value="0">Inactive</option>
            </select>
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Image URL</label>
          <input v-model="form.image" class="form-input" maxlength="500" placeholder="https://images.unsplash.com/...">
          <div v-if="form.image" style="margin-top:12px"><img :src="form.image" style="width:80px;height:80px;border-radius:8px;object-fit:cover"></div>
        </div>
        <div style="display:flex;gap:12px">
          <button type="submit" class="btn btn-primary" :disabled="submitting">{{ submitting ? 'Saving…' : (editing ? 'Update Product' : 'Create Product') }}</button>
          <button type="button" @click="cancelEdit" class="btn btn-ghost">Cancel</button>
        </div>
        <div v-if="formError" class="alert alert-error">{{ formError }}</div>
      </form>
    </div>

    <!-- Search -->
    <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap">
      <input v-model="search" placeholder="Search products…" class="form-input" style="max-width:320px">
      <select v-model="catFilter" class="form-select" style="max-width:180px">
        <option value="all">All categories</option>
        <option v-for="c in availableCategories" :key="c" :value="c">{{ c }}</option>
      </select>
      <select v-model="activeFilter" class="form-select" style="max-width:160px">
        <option value="all">All</option>
        <option value="active">Active only</option>
        <option value="inactive">Inactive only</option>
      </select>
    </div>

    <div v-if="pending" class="loading-spinner"></div>

    <div v-else style="display:grid;gap:12px">
      <div v-for="p in filteredProducts" :key="p.id" style="display:flex;gap:16px;align-items:center;background:var(--white);border:1px solid var(--border);border-radius:12px;padding:16px;box-shadow:var(--shadow-xs)">
        <img :src="p.image" :alt="p.name" style="width:64px;height:64px;border-radius:10px;object-fit:cover;background:var(--warm-white);flex-shrink:0">
        <div style="flex:1;min-width:0">
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <strong style="font-size:1rem">{{ p.name }}</strong>
            <span v-if="p.badge" class="product-card__badge" style="position:static">{{ p.badge }}</span>
            <span style="font-size:.7rem;padding:2px 8px;border-radius:999px;background:var(--warm-white);border:1px solid var(--border-light)">{{ p.category }}</span>
            <span v-if="p.active===0" style="font-size:.7rem;padding:2px 8px;border-radius:999px;background:#fee;color:#991b1b">inactive</span>
          </div>
          <div style="font-size:.85rem;color:var(--text-muted);margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:520px">{{ p.description }}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-weight:700">£{{ p.price.toFixed(2) }}</div>
          <div style="display:flex;gap:6px;margin-top:8px;justify-content:flex-end">
            <button @click="startEdit(p)" class="btn btn-outline btn--sm">Edit</button>
            <button @click="toggleActive(p)" class="btn btn-ghost btn--sm">{{ p.active ? 'Deactivate' : 'Activate' }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const auth = useAuth()
const showAdd = ref(false)
const editing = ref(null)
const submitting = ref(false)
const formError = ref('')
const search = ref('')
const catFilter = ref('all')
const activeFilter = ref('all')

const form = reactive({
  name: '',
  description: '',
  price: 0,
  category: '',
  badge: '',
  image: '',
  active: 1
})

const { data: products, pending, refresh } = await useFetch('/api/admin/products', {
  headers: computed(() => {
    const h = {}
    if (auth.user.value?.id) h['x-user-id'] = String(auth.user.value.id)
    return h
  })
})

const availableCategories = computed(() => {
  if (!products.value) return []
  return [...new Set(products.value.map(p => p.category))].sort()
})

const filteredProducts = computed(() => {
  if (!products.value) return []
  let list = products.value
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }
  if (catFilter.value !== 'all') {
    list = list.filter(p => p.category === catFilter.value)
  }
  if (activeFilter.value === 'active') list = list.filter(p => p.active === 1)
  if (activeFilter.value === 'inactive') list = list.filter(p => p.active === 0)
  return list.sort((a,b) => a.id - b.id)
})

function startEdit(p) {
  editing.value = p
  form.name = p.name
  form.description = p.description
  form.price = p.price
  form.category = p.category
  form.badge = p.badge || ''
  form.image = p.image
  form.active = p.active
  showAdd.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function cancelEdit() {
  editing.value = null
  showAdd.value = false
  Object.assign(form, { name: '', description: '', price: 0, category: '', badge: '', image: '', active: 1 })
  formError.value = ''
}

async function submitProduct() {
  submitting.value = true
  formError.value = ''
  try {
    if (editing.value) {
      await $fetch(`/api/admin/products/${editing.value.id}`, {
        method: 'PUT',
        headers: auth.user.value?.id ? { 'x-user-id': String(auth.user.value.id) } : {},
        body: { ...form }
      })
    } else {
      await $fetch('/api/admin/products', {
        method: 'POST',
        headers: auth.user.value?.id ? { 'x-user-id': String(auth.user.value.id) } : {},
        body: { ...form }
      })
    }
    await refresh()
    cancelEdit()
  } catch (e) {
    formError.value = e?.data?.message || 'Failed to save product'
  } finally {
    submitting.value = false
  }
}

async function toggleActive(p) {
  try {
    await $fetch(`/api/admin/products/${p.id}`, {
      method: 'PUT',
      headers: auth.user.value?.id ? { 'x-user-id': String(auth.user.value.id) } : {},
      body: { active: p.active ? 0 : 1 }
    })
    await refresh()
  } catch (e) {
    alert(e?.data?.message || 'Failed to toggle')
  }
}

useHead({ title: 'Admin Products — Barbakan' })
</script>
