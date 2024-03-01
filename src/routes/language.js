import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { LanguageController } from '../controllers'

const router = Router()

router.get('/', checkJWT, LanguageController.getAll)

export { router }
