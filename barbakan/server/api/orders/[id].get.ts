import { getDb } from '../../database/db'

function parseUserFromRequest(event: any): { id: number } | null {
  const query = getQuery(event)
  if (query.userId) {
    const id = parseInt(query.userId as string)
    if (!isNaN(id)) return { id }
  }
  const cookieHeader = event.headers.get('cookie') || ''
  const match = cookieHeader.match(/barbakan_user=([^;]+)/)
  if (match) {
    try {
      const parsed = JSON.parse(decodeURIComponent(match[1]))
      if (parsed && typeof parsed.id === 'number') return { id: parsed.id }
    } catch {}
  }
  const xUserId = event.headers.get('x-user-id')
  if (xUserId) {
    const id = parseInt(xUserId)
    if (!isNaN(id)) return { id }
  }
  return null
}

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id || '0')
  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid order id' })
  }
  const db = getDb()
  const order = db.orders.find((o: any) => o.id === id)
  if (!order) {
    throw createError({ statusCode: 404, message: 'Order not found' })
  }

  const authUser = parseUserFromRequest(event)

  // If order has user_id, require matching auth
  if (order.user_id) {
    if (!authUser || authUser.id !== order.user_id) {
      throw createError({ statusCode: 403, message: 'Not authorized to view this order' })
    }
  } else {
    // For guest orders, allow if email matches? For now require auth or allow public via id only if no user_id
    // We allow public view for guest orders (since they have no account), but could add email check
    // Keep as public for confirmation page, but don't expose list
  }

  const items = db.order_items.filter((oi: any) => oi.order_id === id).map((oi: any) => {
    const product = db.products.find((p: any) => p.id === oi.product_id)
    return { ...oi, name: product?.name, image: product?.image, description: product?.description }
  })
  return { ...order, items }
})
