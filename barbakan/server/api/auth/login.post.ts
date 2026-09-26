import bcrypt from 'bcryptjs'
import { getDb } from '../../database/db'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'All fields are required' })
  }

  const trimmedEmail = String(email).trim().toLowerCase()
  if (!isValidEmail(trimmedEmail)) {
    throw createError({ statusCode: 400, message: 'Invalid email address' })
  }

  const db = getDb()
  const user = db.users.find((u: any) => u.email.toLowerCase() === trimmedEmail)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid email or password' })
  }

  const valid = await bcrypt.compare(String(password), user.password)
  if (!valid) {
    throw createError({ statusCode: 401, message: 'Invalid email or password' })
  }

  return { success: true, user: { id: user.id, name: user.name, email: user.email } }
})
