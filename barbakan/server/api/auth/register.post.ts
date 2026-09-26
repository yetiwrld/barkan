import bcrypt from 'bcryptjs'
import { getDb, saveDb, getNextId } from '../../database/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, password } = body

  if (!name || !email || !password) {
    throw createError({ statusCode: 400, message: 'All fields are required' })
  }

  const db = getDb()
  const existing = db.users.find(u => u.email === email)
  if (existing) {
    throw createError({ statusCode: 400, message: 'Email already registered' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = {
    id: getNextId('users'),
    name,
    email,
    password: hashedPassword,
    created_at: new Date().toISOString()
  }
  db.users.push(newUser)
  saveDb(db)

  return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } }
})