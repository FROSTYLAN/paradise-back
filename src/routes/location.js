import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { LocationController } from '../controllers'

const router = Router()

router.get('/', checkJWT, LocationController.getAll)

export { router }
