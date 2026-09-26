import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync } from 'fs'
import { join } from 'path'

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  active: number
  badge?: string
}

interface User {
  id: number
  name: string
  email: string
  password: string
  created_at: string
}

interface Order {
  id: number
  user_id: number | null
  status: string
  total: number
  customer_name: string
  customer_email: string
  customer_phone: string
  delivery_address: string
  notes: string
  created_at: string
}

interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price: number
}

interface Database {
  products: Product[]
  users: User[]
  orders: Order[]
  order_items: OrderItem[]
}

const dataDir = join(process.cwd(), 'data')
const dbPath = join(dataDir, 'barbakan.json')

function ensureDataDir() {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true })
  }
}

function loadDb(): Database {
  ensureDataDir()
  if (!existsSync(dbPath)) {
    // Return empty structure, will be populated from file if exists else default handled by initial file
    // Try to read from bundled default if available
    try {
      const defaultPath = join(process.cwd(), 'data', 'barbakan.json')
      if (existsSync(defaultPath)) {
        return JSON.parse(readFileSync(defaultPath, 'utf-8'))
      }
    } catch {}
    const empty: Database = { products: [], users: [], orders: [], order_items: [] }
    writeFileSync(dbPath, JSON.stringify(empty, null, 2))
    return empty
  }
  try {
    const raw = readFileSync(dbPath, 'utf-8')
    const parsed = JSON.parse(raw)
    // Ensure arrays exist
    return {
      products: Array.isArray(parsed.products) ? parsed.products : [],
      users: Array.isArray(parsed.users) ? parsed.users : [],
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
      order_items: Array.isArray(parsed.order_items) ? parsed.order_items : []
    }
  } catch {
    return { products: [], users: [], orders: [], order_items: [] }
  }
}

export function getDb(): Database {
  return loadDb()
}

export function saveDb(data: Database) {
  ensureDataDir()
  // Atomic write via temp file
  const tmpPath = dbPath + '.tmp'
  writeFileSync(tmpPath, JSON.stringify(data, null, 2))
  // Rename
  try {
    renameSync(tmpPath, dbPath)
  } catch {
    // Fallback direct write
    writeFileSync(dbPath, JSON.stringify(data, null, 2))
  }
}

export function getNextId(table: 'users' | 'orders' | 'order_items'): number {
  const db = loadDb()
  const items = db[table] as { id: number }[]
  if (!items.length) return 1
  return Math.max(...items.map((i) => i.id)) + 1
}

export function findProductById(id: number): Product | undefined {
  const db = loadDb()
  return db.products.find((p) => p.id === id && p.active === 1)
}

export function calculateOrderTotal(items: { id: number; quantity: number }[]): { total: number; validatedItems: { product_id: number; quantity: number; price: number; name: string }[] } {
  const db = loadDb()
  let total = 0
  const validatedItems: { product_id: number; quantity: number; price: number; name: string }[] = []
  for (const it of items) {
    const product = db.products.find((p) => p.id === it.id && p.active === 1)
    if (!product) {
      throw new Error(`Product ${it.id} not found or inactive`)
    }
    const qty = Math.max(1, Math.min(99, Math.floor(it.quantity) || 1))
    const price = Number(product.price)
    total += price * qty
    validatedItems.push({ product_id: product.id, quantity: qty, price, name: product.name })
  }
  // Round to 2 decimals
  total = Math.round(total * 100) / 100
  return { total, validatedItems }
}
