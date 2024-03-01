import { sign, verify } from 'jsonwebtoken'

const JWT_SECRET =
  process.env.JWT_SECRET || '81a6db71-9d89-4b95-a5de-95061426ab81'

export const generateToken = (payload) => {
  const jwt = sign(payload, JWT_SECRET, { expiresIn: '2h' })
  return jwt
}

export const verifyToken = (token) => {
  try {
    const payload = verify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}
