import { getDb, saveDb } from '../../../database/db'
import { requireAdmin } from '../../../utils/admin'

const VALID_STATUSES = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = parseInt(event.context.params?.id || '0')
  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid order id' })
  }

  const body = await readBody(event)
  const { status } = body

  if (!status || !VALID_STATUSES.includes(status)) {
    throw createError({ statusCode: 400, message: `Status must be one of: ${VALID_STATUSES.join(', ')}` })
  }

  const db = getDb()
  const order = db.orders.find(o => o.id === id)
  if (!order) {
    throw createError({ statusCode: 404, message: 'Order not found' })
  }

  order.status = status
  saveDb(db)

  return { success: true, order }
})
