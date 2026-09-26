import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

interface Database {
  products: any[]
  users: any[]
  orders: any[]
  order_items: any[]
}

const dataDir = join(process.cwd(), 'data')
const dbPath = join(dataDir, 'barbakan.json')

const defaultData: Database = {
  products: [
    { id: 1, name: 'Pierogi Ruskie', description: 'Traditional Polish dumplings with potato and cheese filling', price: 8.99, category: 'pierogi', image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400', active: 1 },
    { id: 2, name: 'Pierogi z Miesem', description: 'Dumplings filled with seasoned meat', price: 9.49, category: 'pierogi', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', active: 1 },
    { id: 3, name: 'Kielbasa', description: 'Traditional Polish smoked sausage', price: 12.99, category: 'meats', image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400', active: 1 },
    { id: 4, name: 'Bigos', description: 'Traditional Polish hunter stew with sauerkraut and meat', price: 14.99, category: 'meals', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', active: 1 },
    { id: 5, name: 'Golabki', description: 'Cabbage rolls stuffed with meat and rice', price: 13.99, category: 'meals', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400', active: 1 },
    { id: 6, name: 'zurek', description: 'Traditional Polish sourdough soup with sausage and egg', price: 7.99, category: 'soups', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', active: 1 },
    { id: 7, name: 'Paczek', description: 'Polish doughnuts filled with rose jam', price: 4.99, category: 'bakery', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', active: 1 },
    { id: 8, name: 'Sernik', description: 'Traditional Polish cheesecake', price: 6.99, category: 'bakery', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400', active: 1 },
    { id: 9, name: 'Kapusniak', description: 'Polish soup with sauerkraut and vegetables', price: 6.99, category: 'soups', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', active: 1 },
    { id: 10, name: 'Placki Ziemniaczane', description: 'Polish potato pancakes', price: 7.99, category: 'sides', image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400', active: 1 },
    { id: 11, name: 'Nalesniki', description: 'Polish crepes with sweet or savory filling', price: 8.49, category: 'pierogi', image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400', active: 1 },
    { id: 12, name: 'Borsch', description: 'Beetroot soup with vegetables', price: 7.49, category: 'soups', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', active: 1 },
    { id: 13, name: 'Kotlet Schabowy', description: 'Breaded pork cutlet with sides', price: 15.99, category: 'meals', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400', active: 1 },
    { id: 14, name: 'Zrazy Wolowe', description: 'Beef rolls with bacon and pickles', price: 18.99, category: 'meals', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', active: 1 },
    { id: 15, name: 'Kapusta Kiszona', description: 'Fermented Polish sauerkraut', price: 4.99, category: 'sides', image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400', active: 1 },
    { id: 16, name: 'Ogorki Konserwowe', description: 'Polish pickled cucumbers', price: 3.99, category: 'sides', image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400', active: 1 },
    { id: 17, name: 'Chleb', description: 'Traditional Polish rye bread', price: 3.49, category: 'bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', active: 1 },
    { id: 18, name: 'Makowiec', description: 'Polish poppy seed roll cake', price: 5.99, category: 'bakery', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', active: 1 },
    { id: 19, name: 'Kompot', description: 'Traditional Polish fruit compote', price: 2.99, category: 'drinks', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400', active: 1 },
    { id: 20, name: 'Kisiel', description: 'Polish fruit jelly dessert', price: 3.49, category: 'desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', active: 1 },
    { id: 21, name: 'Barszcz Czerwony', description: 'Polish beetroot soup', price: 6.49, category: 'soups', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', active: 1 }
  ],
  users: [],
  orders: [],
  order_items: []
}

function loadDb(): Database {
  if (!existsSync(dbPath)) {
    writeFileSync(dbPath, JSON.stringify(defaultData, null, 2))
    return defaultData
  }
  try {
    return JSON.parse(readFileSync(dbPath, 'utf-8'))
  } catch {
    return defaultData
  }
}

export function getDb(): Database {
  return loadDb()
}

export function saveDb(data: Database) {
  writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

export function getNextId(table: 'users' | 'orders' | 'order_items'): number {
  const db = loadDb()
  const items = db[table]
  if (!items.length) return 1
  return Math.max(...items.map((i: any) => i.id)) + 1
}