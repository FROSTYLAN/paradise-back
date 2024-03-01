import 'dotenv/config'
import * as paths from './paths'
import * as schemas from './schemas'

const getPaths = () => {
  return Object.values(paths).reduce(
    (acc, current) => ({ ...acc, ...current }),
    {}
  )
}

export const swaggerDocs = () => {
  const PORT = process.env.PORT || 3000
  const PARADISE_API_URL = process.env.PARADISE_API_URL

  const servers = [{ url: `http://localhost:${PORT}` }]
  if (PARADISE_API_URL) servers.push({ url: PARADISE_API_URL })

  return {
    openapi: '3.0.0',
    info: {
      title: 'Paradise API',
      version: '1.0.0'
    },
    servers,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas,
      parameters: {
        authorization: {
          in: 'header',
          name: 'authorization',
          schema: {
            type: 'string'
          }
        }
      }
    },
    tags: [
      'Auth',
      'Currency',
      'Gender',
      'Language',
      'Location',
      'Pricing',
      'Subscription',
      'UserLocation',
      'UserMatch',
      'UserMessage',
      'UserPhoto',
      'UserPreference',
      'UserProfile',
      'UserRating',
      'User',
      'Verification'
    ],
    paths: getPaths()
  }
}
