import { getDb } from '../../database/db'

function parseUserFromRequest(event: any): { id: number; email?: string } | null {
  // Try query param userId for simplicity (client sends it), but also check cookie
  const query = getQuery(event)
  if (query.userId) {
    const id = parseInt(query.userId as string)
    if (!isNaN(id)) return { id }
  }
  // Try header cookie
  const cookieHeader = event.headers.get('cookie') || ''
  const match = cookieHeader.match(/barbakan_user=([^;]+)/)
  if (match) {
    try {
      const parsed = JSON.parse(decodeURIComponent(match[1]))
      if (parsed && typeof parsed.id === 'number') return { id: parsed.id, email: parsed.email }
    } catch {}
  }
  // Try Authorization-like body? For GET we also check header x-user-id (fallback)
  const xUserId = event.headers.get('x-user-id')
  if (xUserId) {
    const id = parseInt(xUserId)
    if (!isNaN(id)) return { id }
  }
  return null
}

export default defineEventHandler(async (event) => {
  const authUser = parseUserFromRequest(event)
  const db = getDb()

  // If no auth, return empty (do not expose all orders)
  if (!authUser) {
    return []
  }

  const user = db.users.find(u => u.id === authUser.id)
  if (!user) {
    return []
  }

  // Return only user's orders, newest first
  const orders = db.orders
    .filter(o => o.user_id === authUser.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map(o => {
      const items = db.order_items.filter(oi => oi.order_id === o.id).map(oi => {
        const product = db.products.find(p => p.id === oi.product_id)
        return { ...oi, name: product?.name || 'Product', image: product?.image }
      })
      return { ...o, items }
    })

  return orders
})
