import * as express from 'express'
import { PlaceService } from '../services/place.service'

export default class PlaceController {
  service: PlaceService

  constructor() {
    this.service = new PlaceService()
  }

  create = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const data = await this.service.create(req.body, req.user.userId)
      return res.status(200).json({ data })
    } catch (e) {
      next(e)
    }
  }

  list = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const data = await this.service.list(req.body)
      return res.status(200).json({ data })
    } catch (e) {
      next(e)
    }
  }
}
