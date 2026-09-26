<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>Create account</h1>
      <p>Join Barbakan to track orders and reorder your favourites quickly</p>

      <form class="auth-form" @submit.prevent="handleRegister">
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Full Name</label>
          <input class="form-input" type="text" v-model="name" required placeholder="Jane Smith" autocomplete="name" />
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Email Address</label>
          <input class="form-input" type="email" v-model="email" required placeholder="you@example.com" autocomplete="email" />
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Password</label>
          <input class="form-input" type="password" v-model="password" required placeholder="At least 6 characters" autocomplete="new-password" />
          <div style="font-size:.75rem;color:var(--text-muted);margin-top:4px">Must be at least 6 characters</div>
        </div>

        <div v-if="error" class="auth-error">{{ error }}</div>

        <button type="submit" class="btn btn-primary btn--full btn--lg" :disabled="auth.loading.value">
          <span v-if="auth.loading.value">Creating account...</span>
          <span v-else>Create Account</span>
        </button>

        <div class="auth-divider">or</div>

        <div class="auth-link">
          Already have an account? <NuxtLink to="/account/login">Log in</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()
const router = useRouter()
const route = useRoute()
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const redirect = computed(() => (route.query.redirect) || '/account')

const handleRegister = async () => {
  error.value = ''
  if (!name.value.trim() || !email.value.trim() || !password.value) {
    error.value = 'Please fill all fields'
    return
  }
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }
  const res = await auth.register(name.value, email.value, password.value)
  if (res.success) {
    router.push(redirect.value)
  } else {
    error.value = res.error || 'Registration failed'
  }
}

useHead({ title: 'Create Account — Barbakan' })
</script>
