import { getDb, saveDb } from '../../../database/db'
import { requireAdmin } from '../../../utils/admin'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = parseInt(event.context.params?.id || '0')
  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid product id' })
  }

  const body = await readBody(event)
  const db = getDb()
  const product = db.products.find(p => p.id === id)
  if (!product) {
    throw createError({ statusCode: 404, message: 'Product not found' })
  }

  // Update fields if provided
  if (body.name !== undefined) {
    const n = String(body.name).trim()
    if (n.length < 2 || n.length > 100) throw createError({ statusCode: 400, message: 'Name must be 2-100 chars' })
    product.name = n
  }
  if (body.description !== undefined) {
    product.description = String(body.description).trim().slice(0, 500)
  }
  if (body.price !== undefined) {
    const num = Number(body.price)
    if (isNaN(num) || num < 0 || num > 1000) throw createError({ statusCode: 400, message: 'Invalid price' })
    product.price = Math.round(num * 100) / 100
  }
  if (body.category !== undefined) {
    product.category = String(body.category).trim().toLowerCase().slice(0, 50)
  }
  if (body.image !== undefined) {
    product.image = String(body.image).trim().slice(0, 500)
  }
  if (body.badge !== undefined) {
    product.badge = String(body.badge).trim().slice(0, 30)
  }
  if (body.active !== undefined) {
    product.active = body.active ? 1 : 0
  }

  saveDb(db)
  return { success: true, product }
})
