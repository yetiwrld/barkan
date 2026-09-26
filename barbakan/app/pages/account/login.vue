<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>Welcome back</h1>
      <p>Log in to view your orders and reorder your favourites</p>

      <form class="auth-form" @submit.prevent="handleLogin">
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Email Address</label>
          <input class="form-input" type="email" v-model="email" required placeholder="you@example.com" autocomplete="email" />
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Password</label>
          <input class="form-input" type="password" v-model="password" required placeholder="••••••••" autocomplete="current-password" />
        </div>

        <div v-if="error" class="auth-error">{{ error }}</div>

        <button type="submit" class="btn btn-primary btn--full btn--lg" :disabled="auth.loading.value">
          <span v-if="auth.loading.value">Logging in...</span>
          <span v-else>Log In</span>
        </button>

        <div class="auth-divider">or</div>

        <div class="auth-link">
          Don't have an account? <NuxtLink to="/account/register">Create account</NuxtLink>
        </div>
        <div class="auth-link" style="margin-top:4px">
          <NuxtLink to="/order">Continue as guest → Order Online</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()
const router = useRouter()
const route = useRoute()
const email = ref('')
const password = ref('')
const error = ref('')

const redirect = computed(() => (route.query.redirect) || '/account')

const handleLogin = async () => {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Please enter email and password'
    return
  }
  const res = await auth.login(email.value, password.value)
  if (res.success) {
    router.push(redirect.value)
  } else {
    error.value = res.error || 'Invalid email or password'
  }
}

useHead({ title: 'Login — Barbakan' })
</script>
