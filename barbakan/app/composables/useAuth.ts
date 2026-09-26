interface User {
  id: number
  name: string
  email: string
  isAdmin?: boolean
}

export const useAuth = () => {
  const user = useState<User | null>('auth.user', () => null)
  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => !!user.value?.isAdmin || ['admin@barbakan.co.uk','admin@barbakan-deli.co.uk','admin@barbakan.local'].includes(user.value?.email?.toLowerCase() || ''))
  const loading = useState<boolean>('auth.loading', () => false)

  // Initialize from localStorage on client
  const init = () => {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem('barbakan_user')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && parsed.id && parsed.email) {
          user.value = parsed
        }
      }
    } catch {}
  }

  // Persist
  const persist = (u: User | null) => {
    if (typeof window === 'undefined') return
    if (u) {
      localStorage.setItem('barbakan_user', JSON.stringify(u))
      // also set cookie for server-side checks (non-httpOnly for simplicity, real prod should use httpOnly)
      document.cookie = `barbakan_user=${encodeURIComponent(JSON.stringify(u))}; path=/; max-age=${60*60*24*30}; SameSite=Lax`
    } else {
      localStorage.removeItem('barbakan_user')
      document.cookie = 'barbakan_user=; path=/; max-age=0'
    }
  }

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    loading.value = true
    try {
      const res = await $fetch<{ success: boolean; user: User }>('/api/auth/register', {
        method: 'POST',
        body: { name, email, password }
      })
      if (res.success && res.user) {
        user.value = res.user
        persist(res.user)
        return { success: true }
      }
      return { success: false, error: 'Registration failed' }
    } catch (e: any) {
      const msg = e?.data?.message || e?.statusMessage || 'Registration failed'
      return { success: false, error: msg }
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    loading.value = true
    try {
      const res = await $fetch<{ success: boolean; user: User }>('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      if (res.success && res.user) {
        user.value = res.user
        persist(res.user)
        return { success: true }
      }
      return { success: false, error: 'Invalid credentials' }
    } catch (e: any) {
      const msg = e?.data?.message || e?.statusMessage || 'Invalid email or password'
      return { success: false, error: msg }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    persist(null)
  }

  // Auto-init on client
  if (typeof window !== 'undefined' && !user.value) {
    init()
  }

  return { user, isLoggedIn, isAdmin, loading, register, login, logout, init }
}
