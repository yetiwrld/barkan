import { getDb, saveDb, getNextId, calculateOrderTotal } from '../../database/db'

function getAuthUserFromBody(body: any): { id: number; email: string } | null {
  try {
    if (body && body.user && typeof body.user.id === 'number') {
      return { id: body.user.id, email: body.user.email }
    }
  } catch {}
  return null
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { items, customer, user } = body

  if (!Array.isArray(items) || items.length === 0) {
    throw createError({ statusCode: 400, message: 'Cart is empty' })
  }

  if (items.length > 50) {
    throw createError({ statusCode: 400, message: 'Too many items' })
  }

  if (!customer?.name || !customer?.email) {
    throw createError({ statusCode: 400, message: 'Name and email are required' })
  }

  const name = String(customer.name).trim()
  const email = String(customer.email).trim().toLowerCase()
  const phone = String(customer.phone || '').trim().slice(0, 30)
  const address = String(customer.address || '').trim().slice(0, 500)
  const notes = String(customer.notes || '').trim().slice(0, 500)

  if (name.length < 2 || name.length > 80) {
    throw createError({ statusCode: 400, message: 'Name must be 2-80 characters' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, message: 'Invalid email' })
  }

  // Validate items shape and server-side price recalculation
  const normalizedItems = items.map((it: any) => ({
    id: Number(it.id),
    quantity: Number(it.quantity)
  })).filter((it: any) => !isNaN(it.id) && !isNaN(it.quantity) && it.id > 0 && it.quantity > 0)

  if (normalizedItems.length === 0) {
    throw createError({ statusCode: 400, message: 'Invalid cart items' })
  }

  let total: number
  let validatedItems: { product_id: number; quantity: number; price: number; name: string }[]
  try {
    const result = calculateOrderTotal(normalizedItems)
    total = result.total
    validatedItems = result.validatedItems
  } catch (e: any) {
    throw createError({ statusCode: 400, message: e.message || 'Invalid products' })
  }

  const db = getDb()

  // Try to link user if provided and exists
  let userId: number | null = null
  const authUser = getAuthUserFromBody(body)
  if (authUser) {
    const dbUser = db.users.find(u => u.id === authUser.id && u.email.toLowerCase() === String(authUser.email).toLowerCase())
    if (dbUser) {
      userId = dbUser.id
    }
  } else {
    // Also try cookie
    const cookieHeader = event.headers.get('cookie') || ''
    const match = cookieHeader.match(/barbakan_user=([^;]+)/)
    if (match) {
      try {
        const parsed = JSON.parse(decodeURIComponent(match[1]))
        if (parsed && typeof parsed.id === 'number') {
          const dbUser = db.users.find(u => u.id === parsed.id)
          if (dbUser) userId = dbUser.id
        }
      } catch {}
    }
  }

  const orderId = getNextId('orders')
  const order = {
    id: orderId,
    user_id: userId,
    status: 'pending',
    total,
    customer_name: name,
    customer_email: email,
    customer_phone: phone,
    delivery_address: address,
    notes,
    created_at: new Date().toISOString()
  }

  db.orders.push(order)

  for (const v of validatedItems) {
    db.order_items.push({
      id: getNextId('order_items'),
      order_id: orderId,
      product_id: v.product_id,
      quantity: v.quantity,
      price: v.price
    })
  }

  saveDb(db)
  return { success: true, orderId: order.id, total: order.total }
})
