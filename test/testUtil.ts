import * as moment from 'moment'
import * as supertest from 'supertest'
import { CommonUtils } from '../src/utils/CommonUtils'
import App from '../src/app'

jest.setTimeout(20000)

export function setNow(momentParsableString: string = '2020-01-01 00:00:00') {
  const momentToReturn = moment(momentParsableString)
  jest
    .spyOn(CommonUtils, 'getNowMoment')
    .mockImplementation(() => momentToReturn.clone())
}

interface IJwt {
  key: string
  value: string
}

interface IRequestInput {
  header?: IJwt
  path: string
  body?: Object
  query?: Object
}

interface IData {
  [key: string]: string | { [key: string]: string }
}

interface IRequestOutput {
  statusCode: number
  data?: IData
  message?: string
}

interface IHandlerInput {
  statusCode: number
  text: string
}

class SupertestRequest {
  request = supertest(new App().getServer())

  handler(res: IHandlerInput): IRequestOutput {
    const r = JSON.parse(res.text)
    if (res.statusCode === 200) {
      return { statusCode: res.statusCode, data: r.data }
    }
    return { statusCode: res.statusCode, message: r.message }
  }

  async postRequestWithJwt(data: IRequestInput): Promise<IRequestOutput> {
    const { header, path, body } = data
    return this.handler(
      await this.request.post(path).set(header.key, header.value).send(body)
    )
  }

  async postRequest(data: IRequestInput): Promise<IRequestOutput> {
    const { path, body } = data
    return this.handler(await this.request.post(path).send(body))
  }

  async patchRequestWithJwt(data: IRequestInput): Promise<IRequestOutput> {
    const { header, path, body } = data
    return this.handler(
      await this.request.patch(path).set(header.key, header.value).send(body)
    )
  }

  async deleteRequestWithJwt(data: IRequestInput): Promise<IRequestOutput> {
    const { header, path, body } = data
    return this.handler(
      await this.request.delete(path).set(header.key, header.value).send(body)
    )
  }

  async getRequestWithJwt(data: IRequestInput): Promise<IRequestOutput> {
    const { header, path, query } = data
    return this.handler(
      await this.request.get(path).set(header.key, header.value).query(query)
    )
  }
}

export const TestRequest = new SupertestRequest()
