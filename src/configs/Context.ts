import { Request } from 'express'

export default class Context {
  static _requestContextMap = new WeakMap<Request, Context>()

  constructor() {}

  static bindRequestContext(req: Request): void {
    const ctx = new Context()
    Context._requestContextMap.set(req, ctx)
  }
  static getRequestContext(req: Request): Context | null {
    return Context._requestContextMap.get(req)
  }
}
