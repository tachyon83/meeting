import * as express from 'express'
import UserService from '../services/user.service'
import { NextFunction } from 'express'

export default class UserController {
  service: UserService

  constructor() {
    this.service = new UserService()
  }

  create = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const data = await this.service.create(req.body)
      return res.status(200).json({ data })
    } catch (e) {
      next(e)
    }
  }

  login = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const data = await this.service.login(req.body)
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

  // update = async (req: express.Request, res: express.Response) => {
  //     const data = await this.service.update(req.body)
  //     return res.status(200).json({ data })
  // }
}
