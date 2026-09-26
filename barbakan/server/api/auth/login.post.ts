import bcrypt from 'bcryptjs'
import { getDb } from '../../database/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'All fields are required' })
  }

  const db = getDb()
  const user = db.users.find((u: any) => u.email === email)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  return { success: true, user: { id: user.id, name: user.name, email: user.email } }
})