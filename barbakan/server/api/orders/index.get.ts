import { getDb } from '../../database/db'

export default defineEventHandler(async () => {
  const db = getDb()
  return db.orders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
})