interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
  category?: string
}

const CART_KEY = 'barbakan_cart'

export const useCart = () => {
  const items = useState<CartItem[]>('cart.items', () => [])
  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const total = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  const persist = () => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items.value))
    } catch {}
  }

  const init = () => {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem(CART_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          items.value = parsed.filter((i: any) => i && typeof i.id === 'number' && typeof i.quantity === 'number')
        }
      }
    } catch {}
  }

  const add = (product: any, qty = 1) => {
    const quantity = Math.max(1, Math.min(99, Math.floor(qty) || 1))
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity = Math.min(99, existing.quantity + quantity)
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        quantity,
        image: product.image,
        category: product.category
      })
    }
    persist()
  }

  const remove = (id: number) => {
    items.value = items.value.filter(i => i.id !== id)
    persist()
  }

  const updateQuantity = (id: number, quantity: number) => {
    const item = items.value.find(i => i.id === id)
    if (!item) return
    const q = Math.floor(quantity)
    if (q <= 0) {
      remove(id)
    } else {
      item.quantity = Math.min(99, Math.max(1, q))
      persist()
    }
  }

  const clear = () => {
    items.value = []
    persist()
  }

  // Auto-init
  if (typeof window !== 'undefined' && items.value.length === 0) {
    init()
  }

  return { items, itemCount, total, add, remove, updateQuantity, clear, init }
}
