import { getDb, saveDb } from '../../../database/db'
import { requireAdmin } from '../../../utils/admin'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const body = await readBody(event)
  const { name, description, price, category, image, badge, active } = body

  if (!name || !description || price === undefined || !category) {
    throw createError({ statusCode: 400, message: 'Name, description, price, category required' })
  }

  const trimmedName = String(name).trim()
  if (trimmedName.length < 2 || trimmedName.length > 100) {
    throw createError({ statusCode: 400, message: 'Name must be 2-100 characters' })
  }

  const numPrice = Number(price)
  if (isNaN(numPrice) || numPrice < 0 || numPrice > 1000) {
    throw createError({ statusCode: 400, message: 'Price must be 0-1000' })
  }

  const db = getDb()
  const newId = db.products.length ? Math.max(...db.products.map(p => p.id)) + 1 : 1

  const newProduct = {
    id: newId,
    name: trimmedName,
    description: String(description).trim().slice(0, 500),
    price: Math.round(numPrice * 100) / 100,
    category: String(category).trim().toLowerCase().slice(0, 50),
    image: String(image || '').trim().slice(0, 500) || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    active: active === undefined ? 1 : (active ? 1 : 0),
    badge: String(badge || '').trim().slice(0, 30)
  }

  db.products.push(newProduct)
  saveDb(db)

  return { success: true, product: newProduct }
})
