import { getDb } from '../../../database/db'
import { requireAdmin } from '../../../utils/admin'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const query = getQuery(event)
  const status = query.status as string | undefined

  const db = getDb()
  let orders = db.orders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  if (status && status !== 'all') {
    orders = orders.filter(o => o.status === status)
  }

  return orders.map(o => {
    const items = db.order_items.filter(oi => oi.order_id === o.id).map(oi => {
      const product = db.products.find(p => p.id === oi.product_id)
      return { ...oi, name: product?.name || 'Product', image: product?.image }
    })
    const user = o.user_id ? db.users.find(u => u.id === o.user_id) : null
    return {
      ...o,
      items,
      itemCount: items.reduce((s, i) => s + i.quantity, 0),
      user: user ? { id: user.id, name: user.name, email: user.email } : null
    }
  })
})
