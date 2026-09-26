export const useAuth = () => {
  const user = useState('auth.user', () => null)
  const isLoggedIn = computed(() => !!user.value)

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await $fetch('/api/auth/register', {
        method: 'POST',
        body: { name, email, password }
      })
      if (res.success) {
        user.value = res.user
        return true
      }
    } catch (e) {}
    return false
  }

  const login = async (email: string, password: string) => {
    try {
      const res = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      if (res.success) {
        user.value = res.user
        return true
      }
    } catch (e) {}
    return false
  }

  const logout = () => { user.value = null }

  return { user, isLoggedIn, register, login, logout }
}
