import * as express from 'express'
const Router = express.Router

import requestHandler from './request.handler'
import { jwtAuth } from '../utils/jwtAuthMiddleware'

export default class PlaceController {
    path = '/place'
    router = Router()
    service

    constructor(service) {
        this.init(service)
    }

    init(service) {
        const router = Router()

        router.post('/', requestHandler(this.listPlaces))
        // router.get('/', jwtAuth, requestHandler(this.getPoint))

        this.router.use(this.path, router)
        this.service=service
    }

    listPlaces = async (req,res)=>{
        return this.service.list(req.body)
    }
}
