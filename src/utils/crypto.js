import 'dotenv/config'
import CryptoJS from 'crypto-js'

const CRYPTO_SECRET =
  process.env.CRYPTO_SECRET || '47a4cfdf-f401-4a06-a3ea-e9b540e288b1'

export const encryptText = (text) => {
  try {
    const cipherText = CryptoJS.AES.encrypt(text, CRYPTO_SECRET).toString()
    return cipherText
  } catch {
    return null
  }
}

export const decryptText = (cipherText) => {
  try {
    const text = CryptoJS.AES.decrypt(cipherText, CRYPTO_SECRET).toString(
      CryptoJS.enc.Utf8
    )
    return text
  } catch {
    return null
  }
}

export const encryptData = (data) => {
  try {
    const dataString = JSON.stringify(data)
    const cipherText = encryptText(dataString)
    return cipherText
  } catch {
    return null
  }
}

export const decryptData = (cipherData) => {
  try {
    const dataString = decryptText(cipherData)
    const data = JSON.parse(dataString)
    return data
  } catch {
    return null
  }
}
