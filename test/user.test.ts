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

    // const res7 = await request.patch('/user').set('jwt_access_token', r4.data.jwt).send({ username: 'tom2'})
    // const res4 = await request.get('/board').query({ boardId: r3.data.boardId})
  })
})
