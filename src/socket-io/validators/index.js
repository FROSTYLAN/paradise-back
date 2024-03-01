import { seen } from './seen'
import { typing } from './typing'
import { message } from './message'

const getMessage = (event, body) => {
  if (event === 'typing') {
    return typing(body)
  }

  if (event === 'seen') {
    return seen(body)
  }

  if (event === 'message') {
    return message(body)
  }

  return null
}

export const validate = (event, body) => {
  const message = getMessage(event, body)
  return message ? new Error(JSON.stringify({ event, message })) : null
}
