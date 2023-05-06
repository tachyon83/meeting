import { AppDataSource } from '../src/data-source'
import { setNow, TestRequest } from './testUtil'

beforeAll(async () => await AppDataSource.initialize())
afterAll(async () => await AppDataSource.destroy())

describe('favorite', () => {
  beforeEach(async () => await AppDataSource.synchronize(true))

  test('favorite test1', async () => {
    setNow('2022-04-01 17:00:00')

    // u1
    await TestRequest.postRequest({
      path: '/user',
      body: { username: 'u1', email: 'u1@email.com', password: '1234' },
    })
    // u1 login
    const r1 = await TestRequest.postRequest({
      path: '/user/login',
      body: { email: 'u1@email.com', password: '1234' },
    })
    const u1Token = r1.data.accessToken as string

    // u2
    await TestRequest.postRequest({
      path: '/user',
      body: { username: 'u2', email: 'u2@email.com', password: '1234' },
    })
    // u2 login
    const r11 = await TestRequest.postRequest({
      path: '/user/login',
      body: { email: 'u2@email.com', password: '1234' },
    })
    const u2Token = r11.data.accessToken as string

    // u1 favorite1
    const r31 = await TestRequest.postRequestWithJwt({
      header: { key: 'JWT_ACCESS_TOKEN', value: u1Token },
      path: '/favorite',
      body: { location: '37.472, 126.9287' },
    })
    expect(r31.statusCode).toEqual(200)
    const u1f1 = r31.data.favoriteId
    // u1 favorite2
    const r32 = await TestRequest.postRequestWithJwt({
      header: { key: 'JWT_ACCESS_TOKEN', value: u1Token },
      path: '/favorite',
      body: { location: '37.432, 126.9287' },
    })
    expect(r32.statusCode).toEqual(200)
    const u1f2 = r32.data.favoriteId
    // u1 favorite3
    const r33 = await TestRequest.postRequestWithJwt({
      header: { key: 'JWT_ACCESS_TOKEN', value: u1Token },
      path: '/favorite',
      body: { location: '37.492, 126.9287' },
    })
    expect(r33.statusCode).toEqual(200)

    // u1 no more favorite - 3개 초과시 생성 불가
    const e1 = await TestRequest.postRequestWithJwt({
      header: { key: 'JWT_ACCESS_TOKEN', value: u1Token },
      path: '/favorite',
      body: { location: '37.234, 126.9287' },
    })
    expect(e1.statusCode).toEqual(401)
    expect(e1.message).toEqual('noMoreFavorite')

    // u2 가 u1 favorite 수정 시도 - error
    const e2 = await TestRequest.patchRequestWithJwt({
      header: { key: 'JWT_ACCESS_TOKEN', value: u2Token },
      path: '/favorite',
      body: { location: '37.234, 126.9287', favoriteId: u1f1 },
    })
    expect(e2.statusCode).toEqual(401)
    expect(e2.message).toEqual('unAuthorized')

    // u1 이 u1 favorite 수정 성공
    const r4 = await TestRequest.patchRequestWithJwt({
      header: { key: 'JWT_ACCESS_TOKEN', value: u1Token },
      path: '/favorite',
      body: { location: '37.123, 126.9287', favoriteId: u1f1 },
    })
    expect(r4.statusCode).toEqual(200)
    expect(r4.data.location).toEqual('POINT(37.123 126.9287)')

    // u2 가 u1 favorite 삭제 시도 - error
    const e3 = await TestRequest.deleteRequestWithJwt({
      header: { key: 'JWT_ACCESS_TOKEN', value: u2Token },
      path: '/favorite',
      body: { location: '37.234, 126.9287', favoriteId: u1f2 },
    })
    expect(e3.statusCode).toEqual(401)
    expect(e3.message).toEqual('unAuthorized')

    // u1 이 자신의 favorites 조회 성공 (3개)
    const r41 = await TestRequest.getRequestWithJwt({
      header: { key: 'JWT_ACCESS_TOKEN', value: u1Token },
      path: '/favorite',
    })
    expect(r41.statusCode).toEqual(200)
    expect(r41.data.length).toEqual(3)

    // u1 이 u1 favorite 삭제 성공
    const r5 = await TestRequest.deleteRequestWithJwt({
      header: { key: 'JWT_ACCESS_TOKEN', value: u1Token },
      path: '/favorite',
      body: { favoriteId: u1f2 },
    })
    expect(r5.statusCode).toEqual(200)
    expect(r5.data.ok).toEqual(true)

    // u1 이 자신의 favorites 조회 성공 (2개)
    const r51 = await TestRequest.getRequestWithJwt({
      header: { key: 'JWT_ACCESS_TOKEN', value: u1Token },
      path: '/favorite',
    })
    expect(r51.statusCode).toEqual(200)
    expect(r51.data.length).toEqual(2)
  })
})
