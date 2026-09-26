import { getDb } from '../database/db'

export function getUserFromEvent(event: any) {
  // Try x-user-id header
  const xUserId = event.headers.get('x-user-id')
  if (xUserId) {
    const id = parseInt(xUserId)
    if (!isNaN(id)) {
      const db = getDb()
      const user = db.users.find(u => u.id === id)
      if (user) return user
    }
  }
  // Try query userId
  const query = getQuery(event)
  if (query.userId) {
    const id = parseInt(query.userId as string)
    if (!isNaN(id)) {
      const db = getDb()
      const user = db.users.find(u => u.id === id)
      if (user) return user
    }
  }
  // Try cookie barbakan_user
  const cookieHeader = event.headers.get('cookie') || ''
  const match = cookieHeader.match(/barbakan_user=([^;]+)/)
  if (match) {
    try {
      const parsed = JSON.parse(decodeURIComponent(match[1]))
      if (parsed && typeof parsed.id === 'number') {
        const db = getDb()
        const user = db.users.find(u => u.id === parsed.id)
        if (user) return user
      }
    } catch {}
  }
  return null
}

export function requireAdmin(event: any) {
  const user = getUserFromEvent(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Authentication required' })
  }
  // Check isAdmin flag or specific admin emails
  const adminEmails = ['admin@barbakan.co.uk', 'admin@barbakan-deli.co.uk', 'admin@barbakan.local']
  const isAdmin = user.isAdmin || adminEmails.includes(user.email.toLowerCase())
  if (!isAdmin) {
    throw createError({ statusCode: 403, message: 'Admin access required' })
  }
  return user
}
