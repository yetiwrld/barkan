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
  isAdmin?: boolean
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

const ADMIN_DEFAULT = {
  id: 1,
  name: 'Barbakan Admin',
  email: 'admin@barbakan.co.uk',
  // password: admin123
  password: '$2a$10$DcFQ5zNSVeE.VyGauYltS.Pe9DgxqmRNrTIs6//5TSfWQOSKYbEce',
  created_at: new Date().toISOString(),
  isAdmin: true
}

function loadDb(): Database {
  ensureDataDir()
  let db: Database
  if (!existsSync(dbPath)) {
    db = { products: [], users: [], orders: [], order_items: [] }
  } else {
    try {
      const raw = readFileSync(dbPath, 'utf-8')
      const parsed = JSON.parse(raw)
      db = {
        products: Array.isArray(parsed.products) ? parsed.products : [],
        users: Array.isArray(parsed.users) ? parsed.users : [],
        orders: Array.isArray(parsed.orders) ? parsed.orders : [],
        order_items: Array.isArray(parsed.order_items) ? parsed.order_items : []
      }
    } catch {
      db = { products: [], users: [], orders: [], order_items: [] }
    }
  }

  // Seed default admin if not present
  const hasAdmin = db.users.some(u => u.email.toLowerCase() === ADMIN_DEFAULT.email.toLowerCase() || u.isAdmin)
  if (!hasAdmin) {
    // Ensure id not colliding
    if (db.users.some(u => u.id === ADMIN_DEFAULT.id)) {
      ADMIN_DEFAULT.id = db.users.length ? Math.max(...db.users.map(u => u.id)) + 1 : 1
    }
    db.users.push({ ...ADMIN_DEFAULT })
    try {
      const tmpPath = dbPath + '.tmp'
      writeFileSync(tmpPath, JSON.stringify(db, null, 2))
      renameSync(tmpPath, dbPath)
    } catch {
      writeFileSync(dbPath, JSON.stringify(db, null, 2))
    }
  } else {
    // Ensure existing admin has isAdmin flag
    let changed = false
    for (const u of db.users) {
      if (u.email.toLowerCase() === ADMIN_DEFAULT.email.toLowerCase() && !u.isAdmin) {
        u.isAdmin = true
        changed = true
      }
    }
    if (changed) {
      try {
        const tmpPath = dbPath + '.tmp'
        writeFileSync(tmpPath, JSON.stringify(db, null, 2))
        renameSync(tmpPath, dbPath)
      } catch {
        writeFileSync(dbPath, JSON.stringify(db, null, 2))
      }
    }
  }

  return db
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
