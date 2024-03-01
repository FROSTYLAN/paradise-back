import { hash, compare } from 'bcryptjs'

export const generateHash = async (value) => {
  const valueHash = await hash(value, 8)
  return valueHash
}

export const verifyHash = async (value, valueHash) => {
  const isValid = await compare(value, valueHash)
  return isValid
}
