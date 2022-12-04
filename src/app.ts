import * as express from 'express'
import { errorHandler } from './middlewares/error.handler'
import { notFoundHandler } from './middlewares/not.found.handler'
import Context from './configs/Context'
import placeRouter from './routes/place.router'
import userRouter from './routes/user.router'
import favoriteRouter from './routes/favorite.router'

export default class App {
  private app

  // static configOptions = {
  //   aspectSwitch: false,
  // }

  constructor() {
    require('dotenv').config()
    this.app = express()

    this.initMiddlewares()
    this.initRouters()
    this.initErrorHandlers()
    this.initNotFoundHandler()
  }

  listen() {
    const port = process.env.PORT || 3000
    this.app.listen(port, () =>
      console.log(`App started listening on the port #:${port}`)
    )
  }

  getServer() {
    return this.app
  }

  initMiddlewares() {
    this.app.use(express.json())
  }

  initRouters() {
    // this.app.use((req: express.Request, res, next) => {
    //   Context.bindRequestContext(req)
    //   next()
    // })

    this.app.get('/ping', async (req: express.Request, res: express.Response) =>
      res.status(200).json('pong')
    )
    this.app.use('/place', placeRouter)
    this.app.use('/user', userRouter)
    this.app.use('/favorite', favoriteRouter)
  }

  initErrorHandlers() {
    this.app.use(errorHandler)
  }

  initNotFoundHandler() {
    this.app.use(notFoundHandler)
  }
}
