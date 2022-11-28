import * as express from 'express'
import UserController from '../controllers/user.controller'
import { jwtAuth } from '../utils/jwt/jwtAuthMiddleware'
const router = express.Router()
const userController = new UserController()

router.post('/', userController.create)
router.post('/login', userController.login)
router.get('/', jwtAuth, userController.get)
// router.patch('/', jwtAuth, userController.update)

export default router
