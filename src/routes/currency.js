import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { CurrencyController } from '../controllers'

const router = Router()

router.get('/', checkJWT, CurrencyController.getAll)
router.get('/:code', checkJWT, CurrencyController.getOneByCode)

export { router }
