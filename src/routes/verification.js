import multer from 'multer'
import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { VerificationValidator } from '../validators'
import { VerificationController } from '../controllers'
import { validateResult } from '../middlewares/validator'
import { checkFiles } from '../middlewares/files'

const router = Router()
const upload = multer()
const uploadByDni = upload.fields([
  { name: 'front', maxCount: 1 },
  { name: 'back', maxCount: 1 }
])
const uploadByPose = upload.fields([
  { name: 'image_01', maxCount: 1 },
  { name: 'image_02', maxCount: 1 }
])

router.get('/', checkJWT, validateResult, VerificationController.getAll)
router.get(
  '/:user_id',
  checkJWT,
  VerificationValidator.getAllByUserId,
  validateResult,
  VerificationController.getAllByUserId
)
router.post(
  '/dni',
  checkJWT,
  uploadByDni,
  checkFiles(['front', 'back']),
  VerificationController.createByDNI
)
router.post(
  '/pose',
  checkJWT,
  uploadByPose,
  checkFiles(['image_01', 'image_02']),
  VerificationController.createByPose
)
router.put(
  '/approve/:id',
  checkJWT,
  VerificationValidator.approve,
  validateResult,
  VerificationController.approve
)
router.put(
  '/reject/:id',
  checkJWT,
  VerificationValidator.reject,
  validateResult,
  VerificationController.reject
)

export { router }
