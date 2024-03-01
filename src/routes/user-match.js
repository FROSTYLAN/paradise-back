import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { UserMatchValidator } from '../validators'
import { UserMatchController } from '../controllers'
import { validateResult } from '../middlewares/validator'

const router = Router()

router.get('/chats', checkJWT, UserMatchController.getAllChats)
router.get('/requests', checkJWT, UserMatchController.getAllRequests)
router.get('/contacts', checkJWT, UserMatchController.getAllContacts)

router.post(
  '/',
  checkJWT,
  UserMatchValidator.save,
  validateResult,
  UserMatchController.save
)
router.delete(
  '/:id', 
  checkJWT,
  UserMatchValidator.destroy,
  validateResult, 
  UserMatchController.destroy
)
router.get('/notification-requests', UserMatchController.getNumNewRequests)
router.patch('/notification-requests', UserMatchController.cleanNewRequests)

export { router }
