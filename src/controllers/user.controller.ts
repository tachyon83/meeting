import * as express from 'express'
import UserService from '../services/user.service'

export default class UserController {
    service: UserService

    constructor() {
        this.service = new UserService()
    }

    create = async (req: express.Request, res: express.Response) => {
        const data = await this.service.create(req.body)
        return res.status(200).json({ data })
    }

    login = async (req: express.Request, res: express.Response) => {
        const data = await this.service.login(req.body)
        return res.status(200).json({ data })
    }

    // get = async (req: express.Request, res: express.Response) => {
    //     const data = await this.service.get(req.body)
    //     return res.status(200).json({ data })
    // }

    // update = async (req: express.Request, res: express.Response) => {
    //     const data = await this.service.update(req.body)
    //     return res.status(200).json({ data })
    // }
}
