import { beforeMethod, afterMethod, Metadata, onThrowOfMethod } from 'aspect.js'
import Container from 'typedi'
import { ContainerKeys } from '../utils/enums'
import { ServerOptions } from './config.common'

export default class LoggerAspect {
  // _switch: boolean = (() => {
  //   const options: IServerOptions = Container.get(ContainerKeys.ServerOption)
  //   return options.aspectLoggerSwitch
  // })()
  static _switch: boolean = ServerOptions.aspectLoggerSwitch

  @beforeMethod({
    classNamePattern: /.*Logic.*/,
    // methodNamePattern: /.*create.*/,
    methodNamePattern: /.*/,
  })
  anotherBeforeMethod(meta: Metadata) {
    if (!LoggerAspect._switch) return
    console.log(`JUST TO CHECK ANOTHER MEHTOD`)
  }

  @beforeMethod({
    classNamePattern: /.*Logic.*/,
    // methodNamePattern: /.*create.*/,
    methodNamePattern: /.*/,
  })
  invokeBeforeMethod(meta: Metadata) {
    if (!LoggerAspect._switch) return
    console.log(
      `before calling ${meta.className}.${meta.method
        .name} with args: ${meta.method.args.join(', ')}.`
    )
  }

  @afterMethod({
    classNamePattern: /.*Logic.*/,
    // methodNamePattern: /.*create.*/,
    methodNamePattern: /.*/,
  })
  invokeAfterMethod(meta: Metadata) {
    if (!LoggerAspect._switch) return
    console.log(
      `after calling ${meta.className}.${meta.method
        .name} with args: ${meta.method.args.join(', ')}.`
    )
    console.log()
  }

  @onThrowOfMethod({
    classNamePattern: /.*/,
    methodNamePattern: /.*/,
  })
  invokeOnThrowMethod(meta: Metadata) {
    console.log('error?error?error?error?error?error?error?error?')
  }
}
