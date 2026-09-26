interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}

export const useCart = () => {
  const items = useState<CartItem[]>('cart.items', () => [])
  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const total = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  const add = (product: any) => {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image })
    }
  }

  const remove = (id: number) => {
    items.value = items.value.filter(i => i.id !== id)
  }

  const updateQuantity = (id: number, quantity: number) => {
    const item = items.value.find(i => i.id === id)
    if (item) {
      if (quantity <= 0) {
        remove(id)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clear = () => { items.value = [] }

  return { items, itemCount, total, add, remove, updateQuantity, clear }
}
