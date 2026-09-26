import { getDb } from '../../database/db'
import { requireAdmin } from '../../utils/admin'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const db = getDb()

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()

  const totalOrders = db.orders.length
  const pendingOrders = db.orders.filter(o => o.status === 'pending').length
  const todayOrders = db.orders.filter(o => o.created_at >= todayStart).length
  const totalProducts = db.products.length
  const activeProducts = db.products.filter(p => p.active === 1).length
  const totalUsers = db.users.length
  const totalRevenue = db.orders.reduce((sum, o) => sum + (o.total || 0), 0)

  // Recent orders
  const recentOrders = db.orders
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
    .map(o => {
      const items = db.order_items.filter(oi => oi.order_id === o.id)
      return { ...o, itemCount: items.reduce((s, i) => s + i.quantity, 0) }
    })

  return {
    totalOrders,
    pendingOrders,
    todayOrders,
    totalProducts,
    activeProducts,
    totalUsers,
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    recentOrders
  }
})
