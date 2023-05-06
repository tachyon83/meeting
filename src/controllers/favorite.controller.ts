import * as express from 'express'
import { FavoriteService } from '../services/favorite.service'

export default class FavoriteController {
  service: FavoriteService

  constructor() {
    this.service = new FavoriteService()
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

  get = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const data = await this.service.get(req.user.userId)
      return res.status(200).json({ data })
    } catch (e) {
      next(e)
    }
  }

  update = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const data = await this.service.update(req.body, req.user.userId)
      return res.status(200).json({ data })
    } catch (e) {
      next(e)
    }
  }

  delete = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const data = await this.service.delete(req.body, req.user.userId)
      return res.status(200).json({ data })
    } catch (e) {
      next(e)
    }
  }
}
