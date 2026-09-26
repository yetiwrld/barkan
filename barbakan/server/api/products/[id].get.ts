import { getDb } from '../../database/db'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id || '0')
  const db = getDb()
  const product = db.products.find((p: any) => p.id === id && p.active === 1)
  if (!product) {
    throw createError({ statusCode: 404, message: 'Product not found' })
  }
  return product
})