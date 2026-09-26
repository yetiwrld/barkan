<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-card">
        <h1>Create Account</h1>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="name" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="password" required />
          </div>
          <button type="submit" class="btn btn-primary btn-block">Register</button>
        </form>
        <p class="auth-link">Already have an account? <NuxtLink to="/account/login">Login</NuxtLink></p>
      </div>
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()
const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')

const handleRegister = async () => {
  const success = await auth.register(name.value, email.value, password.value)
  if (success) {
    router.push('/account')
  }
}

useHead({ title: 'Register - Barbakan Deli' })
</script>
