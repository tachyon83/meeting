import * as express from 'express'
import FavoriteController from '../controllers/favorite.controller'
import { jwtAuth } from '../utils/jwt/jwtAuthMiddleware'
const router = express.Router()
const favoriteController = new FavoriteController()

router.post('/', jwtAuth, favoriteController.create)
router.patch('/', jwtAuth, favoriteController.update)
router.delete('/', jwtAuth, favoriteController.delete)

export default router
