import './configs/dotenvConfig'
import * as express from 'express'
import { errorHandler } from './middlewares/error.handler'
import { notFoundHandler } from './middlewares/not.found.handler'
import Context from './configs/Context'
import placeRouter from './routes/place.router'

export default class App {
  app

  // static configOptions = {
  //   aspectSwitch: false,
  // }

  constructor() {
    this.app = express()

    this.initMiddlewares()
    this.initRouters()
    this.initErrorHandlers()
    this.initNotFoundHandler()
  }

  listen() {
    const port = process.env.PORT || 3005
    this.app.listen(port, () => {
      console.log(`App started listening on the port #:${port}`)
    })
  }

  getServer() {
    return this.app
  }

  initMiddlewares() {
    this.app.use(express.json())
  }

  initRouters() {
    this.app.use((req: express.Request, res, next) => {
      Context.bindRequestContext(req)
      next()
    })

    this.app.use('/place', placeRouter)
  }

  initErrorHandlers() {
    this.app.use(errorHandler)
  }

  initNotFoundHandler() {
    this.app.use(notFoundHandler)
  }
}
