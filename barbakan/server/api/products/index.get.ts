import { getDb } from '../../database/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = query.category as string | undefined
  
  const db = getDb()
  let products = db.products.filter((p: any) => p.active === 1)
  if (category) {
    products = products.filter((p: any) => p.category === category)
  }
  return products
})