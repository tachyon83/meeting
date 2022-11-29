import { AppDataSource } from './data-source'
import App from './app'
import { ServerOptions } from './configs/config.common'
import { ContainerKeys } from './utils/enums'
import Container from 'typedi'

async function startServer() {
  AppDataSource.initialize()
    .then(async () => {
      console.log('AppDataSource initialized...')

      Container.set(ContainerKeys.ServerOption, ServerOptions)

      const app = new App()
      app.listen()
    })
    .catch((error) => console.log(error))
}

startServer()
