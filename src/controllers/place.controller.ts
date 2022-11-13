import * as express from 'express'
const Router = express.Router

import requestHandler from './request.handler'
import { jwtAuth } from '../utils/jwtAuthMiddleware'
import { PlaceService } from '../services/place.service'

export default class PlaceController {
  path = '/place'
  router = Router()
  service: PlaceService

  constructor() {
    this.init()
  }

  init() {
    const router = Router()

    router.post('/', requestHandler(this.list))
    // router.get('/', jwtAuth, requestHandler(this.getPoint))

    this.router.use(this.path, router)
    this.service = new PlaceService()
  }

  list = async (req: express.Request, res) => {
    return this.service.list(req.body)
  }
}
