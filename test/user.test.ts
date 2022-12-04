import { AppDataSource } from '../src/data-source'
import { setNow, TestRequest } from './testUtil'

beforeAll(async () => {
  await AppDataSource.initialize()
})
afterAll(async () => {
  await AppDataSource.destroy()
})

describe('user', () => {
  beforeEach(async () => await AppDataSource.synchronize(true))

  test('user test1', async () => {
    setNow('2022-11-28')

    const r1 = await TestRequest.postRequest({
      path: '/user',
      body: { username: 'abc', email: 'abcd@email.com', password: '1234' },
    })
    expect(r1.statusCode).toEqual(200)
    expect(r1.data.ok).toEqual(true)

    // u2 - error
    const r2 = await TestRequest.postRequest({
      path: '/user',
      body: { username: 'abc2', email: 'abc2email.com', password: '1234' },
    })
    expect(r2.statusCode).toEqual(422)
    expect(r2.message).toEqual('Email Format Incorrect')

    // u2
    const r3 = await TestRequest.postRequest({
      path: '/user',
      body: { username: 'abc2', email: 'abc2@email.com', password: '1234' },
    })
    expect(r3.statusCode).toEqual(200)
    expect(r3.data.ok).toEqual(true)

    // u2 login - fail
    const r4 = await TestRequest.postRequest({
      path: '/user/login',
      body: { email: 'abc2@email.com', password: '12345' },
    })
    expect(r4.statusCode).toEqual(422)

    // u1 login
    const r5 = await TestRequest.postRequest({
      path: '/user/login',
      body: { email: 'abcd@email.com', password: '1234' },
    })
    expect(r5.statusCode).toEqual(200)
    expect(r5.data.accessToken).not.toBeNull()
    const u1Token = r5.data.accessToken as string

    // u1 get
    const r6 = await TestRequest.getRequestWithJwt({
      path: '/user',
      header: { key: 'JWT_ACCESS_TOKEN', value: u1Token },
    })
    expect(r6.statusCode).toEqual(200)
    expect(r6.data.favorites).toHaveLength(0)
    const r6User = r6.data.user as { [key: string]: string }
    expect(r6User.username).toEqual('abc')
  })
})
