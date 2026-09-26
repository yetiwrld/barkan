import { getDb } from '../../database/db'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id || '0')
  const db = getDb()
  const order = db.orders.find((o: any) => o.id === id)
  if (!order) {
    throw createError({ statusCode: 404, message: 'Order not found' })
  }
  const items = db.order_items.filter((oi: any) => oi.order_id === id).map((oi: any) => {
    const product = db.products.find((p: any) => p.id === oi.product_id)
    return { ...oi, name: product?.name, image: product?.image }
  })
  return { ...order, items }
})