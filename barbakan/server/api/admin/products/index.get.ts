import { getDb } from '../../../database/db'
import { requireAdmin } from '../../../utils/admin'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const db = getDb()
  // Admin sees all products including inactive
  return db.products.sort((a, b) => a.id - b.id)
})
