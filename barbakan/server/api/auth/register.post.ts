import bcrypt from 'bcryptjs'
import { getDb, saveDb, getNextId } from '../../database/db'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, password } = body

  if (!name || !email || !password) {
    throw createError({ statusCode: 400, message: 'All fields are required' })
  }

  const trimmedName = String(name).trim()
  const trimmedEmail = String(email).trim().toLowerCase()

  if (trimmedName.length < 2 || trimmedName.length > 80) {
    throw createError({ statusCode: 400, message: 'Name must be 2-80 characters' })
  }

  if (!isValidEmail(trimmedEmail)) {
    throw createError({ statusCode: 400, message: 'Invalid email address' })
  }

  if (String(password).length < 6 || String(password).length > 128) {
    throw createError({ statusCode: 400, message: 'Password must be at least 6 characters' })
  }

  const db = getDb()
  const existing = db.users.find(u => u.email.toLowerCase() === trimmedEmail)
  if (existing) {
    throw createError({ statusCode: 400, message: 'Email already registered' })
  }

  const hashedPassword = await bcrypt.hash(String(password), 10)
  const newUser = {
    id: getNextId('users'),
    name: trimmedName,
    email: trimmedEmail,
    password: hashedPassword,
    created_at: new Date().toISOString()
  }
  db.users.push(newUser)
  saveDb(db)

  return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } }
})
