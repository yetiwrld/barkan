<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-card">
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="password" required />
          </div>
          <button type="submit" class="btn btn-primary btn-block">Login</button>
        </form>
        <p class="auth-link">Don''t have an account? <NuxtLink to="/account/register">Register</NuxtLink></p>
      </div>
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  const success = await auth.login(email.value, password.value)
  if (success) {
    router.push('/account')
  } else {
    error.value = 'Invalid email or password'
  }
}

useHead({ title: 'Login - Barbakan Deli' })
</script>
