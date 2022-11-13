import * as express from 'express'
import PlaceController from '../controllers/place.controller'
const router = express.Router()
const placeController = new PlaceController()

router.post('/', placeController.create)
router.post('/list', placeController.list)

export default router
