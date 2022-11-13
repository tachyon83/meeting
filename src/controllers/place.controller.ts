import * as express from 'express'
import requestHandler from './request.handler'
import { PlaceService } from '../services/place.service'

export default class PlaceController {
  service: PlaceService

  constructor() {
    this.service = new PlaceService()
  }

  create = async (req: express.Request, res) => {
    const data = await this.service.create(req.body)
    return res.status(200).json({ data })
  }

  list = async (req: express.Request, res) => {
    const data = await this.service.list(req.body)
    return res.status(200).json({ data })
  }
}
