import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { GenderController } from '../controllers'

const router = Router()

router.get('/', checkJWT, GenderController.getAll)

export { router }
