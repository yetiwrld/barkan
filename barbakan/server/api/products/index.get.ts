import { getDb } from '../../database/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = query.category as string | undefined
  
  const db = getDb()
  let products = db.products.filter((p: any) => p.active === 1)
  if (category && category !== 'all') {
    products = products.filter((p: any) => p.category === category)
  }
  // Sort by id for consistency
  return products.sort((a, b) => a.id - b.id)
})
