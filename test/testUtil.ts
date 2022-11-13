import * as moment from 'moment'
import * as supertest from 'supertest'
import { CommonUtils } from '../src/utils/CommonUtils'
import App from '../src/app'

jest.setTimeout(20000)

const request = supertest(new App().app)

export function setNow(momentParsableString: string = '2020-01-01 00:00:00') {
  const momentToReturn = moment(momentParsableString)
  jest
    .spyOn(CommonUtils, 'getNowMoment')
    .mockImplementation(() => momentToReturn.clone())
}

export interface ISupertestObject {
  [key: string]: string | number
}

export interface ISupertestSettingArray extends Array<[string, string]> {}

export enum SupertestMethod {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface ISupertestInput {
  query?: ISupertestObject
  param?: string
  body?: ISupertestObject
  method: SupertestMethod
  pathIn: string
  settings?: ISupertestSettingArray
}

export interface ISupertestOutput {
  statusCode: number
  text: string
}

export function supertestWrapper(input: ISupertestInput): ISupertestOutput {
  let next = request
  console.log(49, next, input)
  const { query, param, body, method, pathIn, settings } = input
  const path = pathIn + param ?? ''

  switch (method) {
    case SupertestMethod.POST:
      next = request.post(path)
      break
    case SupertestMethod.GET:
      next = request.get(path)
      break
    default:
      break
  }
  console.log(63, next)
  if (settings && settings.length > 0) {
    for (const setting of settings) {
      next = next.set(setting[0], setting[1])
    }
  }
  console.log(69, next)
  if (body) {
    next = next.send(body)
  }
  if (query) {
    next = next.query(query)
  }
  console.log(76, next)

  return next.end() as ISupertestOutput
}
