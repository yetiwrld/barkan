<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="admin-sidebar__brand">
        <NuxtLink to="/" class="site-logo">
          <span class="site-logo__name" style="color:#fff">Barbakan</span>
          <span class="site-logo__tag" style="color:rgba(255,255,255,.55)">Admin Portal</span>
        </NuxtLink>
      </div>
      <nav class="admin-nav">
        <NuxtLink to="/admin" exact-active-class="active">📊 Dashboard</NuxtLink>
        <NuxtLink to="/admin/orders" active-class="active">📦 Orders</NuxtLink>
        <NuxtLink to="/admin/products" active-class="active">🥖 Products</NuxtLink>
        <NuxtLink to="/" class="admin-nav__muted">← Back to Website</NuxtLink>
      </nav>
      <div class="admin-sidebar__user" v-if="auth.user.value">
        <div class="account-sidebar__avatar" style="background:rgba(255,255,255,.12);color:#fff">{{ auth.user.value.name[0] }}</div>
        <div>
          <div style="font-weight:600;color:#fff;font-size:.9rem">{{ auth.user.value.name }}</div>
          <div style="font-size:.75rem;color:rgba(255,255,255,.55)">{{ auth.user.value.email }}</div>
        </div>
      </div>
    </aside>
    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>

<script setup>
const auth = useAuth()
const router = useRouter()

onMounted(() => {
  if (!auth.isLoggedIn.value) {
    router.push('/account/login?redirect=/admin')
    return
  }
  if (!auth.isAdmin.value) {
    // Not admin — redirect to home with message
    router.push('/')
  }
})
</script>

<style>
.admin-layout{display:flex;min-height:100vh;background:var(--cream)}
.admin-sidebar{width:260px;background:var(--dark);color:rgba(255,255,255,.7);display:flex;flex-direction:column;padding:24px 16px;position:sticky;top:0;height:100vh;overflow-y:auto;flex-shrink:0}
.admin-sidebar__brand{padding:8px 8px 24px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:16px}
.admin-nav{display:flex;flex-direction:column;gap:4px;flex:1}
.admin-nav a{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;font-size:.9rem;color:rgba(255,255,255,.6);transition:all .15s ease}
.admin-nav a:hover,.admin-nav a.active{background:rgba(255,255,255,.08);color:#fff}
.admin-nav__muted{margin-top:auto;opacity:.5}
.admin-sidebar__user{display:flex;gap:10px;align-items:center;padding:16px 8px 8px;border-top:1px solid rgba(255,255,255,.08);margin-top:16px}
.admin-main{flex:1;padding:32px;overflow-y:auto;min-width:0}
@media(max-width:860px){
  .admin-layout{flex-direction:column}
  .admin-sidebar{width:100%;height:auto;position:relative;padding:16px}
  .admin-main{padding:20px 16px}
}
</style>
