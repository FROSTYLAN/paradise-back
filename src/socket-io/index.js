import 'dotenv/config'
import { validate } from './validators'
import { verifyToken } from '../utils/jwt'
import { UserMessageService } from '../services'

export const options = {
  cors: {
    origin: process.env.PARADISE_URL
  }
}

export const checkJWT = (socket, next) => {
  try {
    const access_token = socket.handshake.query?.token ?? ''

    if (!access_token) {
      return next(new Error('Token requerido'))
    }

    const payload = verifyToken(access_token)

    if (!payload) {
      return next(new Error('No Autorizado'))
    }

    return next()
  } catch {
    return next(new Error('Error al Autenticar'))
  }
}

export const onConnection = (socket) => {
  socket.use(([event, body], next) => {
    const error = validate(event, body)
    return error ? next(error) : next()
  })

  socket.on('error', (error) => console.log(error.message))

  socket.on('typing', (body) => socket.broadcast.emit('typingResponse', body))

  socket.on('noTyping', () => socket.broadcast.emit('noTypingResponse'))

  socket.on('seen', async (body) => {
    await UserMessageService.seen(body)
    return socket.broadcast.emit('seenResponse', body)
  })

  socket.on('message', async (body) => {
    await UserMessageService.create(body)
    return socket.broadcast.emit('messageResponse', body)
  })
}
