import { getDb, saveDb, getNextId } from '../../database/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { items, customer } = body

  if (!items?.length || !customer?.name || !customer?.email) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  const db = getDb()
  const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
  
  const order = {
    id: getNextId('orders'),
    user_id: null,
    status: 'pending',
    total,
    customer_name: customer.name,
    customer_email: customer.email,
    customer_phone: customer.phone || '',
    delivery_address: customer.address || '',
    notes: customer.notes || '',
    created_at: new Date().toISOString()
  }
  
  db.orders.push(order)
  
  for (const item of items) {
    db.order_items.push({
      id: getNextId('order_items'),
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    })
  }
  
  saveDb(db)
  return { success: true, orderId: order.id }
})