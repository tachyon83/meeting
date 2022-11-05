import './configs/dotenvConfig'
import * as express from 'express'
import { errorHandler } from './middlewares/error.handler'
import { notFoundHandler } from './middlewares/not.found.handler'
import Context from './configs/Context'

const Router = express.Router

export default class App {
  app

  // static configOptions = {
  //   aspectSwitch: false,
  // }

  constructor(controllers) {
    this.app = express()

    this.initMiddlewares()
    this.initControllers(controllers)
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

  initControllers(controllers) {
    const router = Router()

    this.app.use((req: express.Request, res, next) => {
      Context.bindRequestContext(req)
      next()
    })

    controllers.forEach(controller => {
      router.use(controller.router)
    })

    this.app.use('/', router)
  }

  initErrorHandlers() {
    this.app.use(errorHandler)
  }

  initNotFoundHandler() {
    this.app.use(notFoundHandler)
  }
}
