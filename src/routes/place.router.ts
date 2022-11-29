import * as express from 'express'
import PlaceController from '../controllers/place.controller'
import { jwtAuth } from '../utils/jwt/jwtAuthMiddleware'
const router = express.Router()
const placeController = new PlaceController()

router.post('/', jwtAuth, placeController.create)
router.post('/list', placeController.list)

export default router
