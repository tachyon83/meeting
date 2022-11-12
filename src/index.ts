import { AppDataSource } from './data-source'
import App from './app'
import { ServerOptions } from './configs/config.common'
import { ContainerKeys } from './utils/enums'
import Container from 'typedi'
import PlaceController from "./controllers/place.controller";
import {PlaceLogicCls} from "./modules/Place/logic";

async function startServer() {
  AppDataSource.initialize()
    .then(async () => {
      console.log('AppDataSource initialized...')

      Container.set(ContainerKeys.ServerOption, ServerOptions)

      const app = new App([
          new PlaceController(new PlaceLogicCls()),
      ])
      app.listen()
    })
    .catch(error => console.log(error))
}

startServer()
