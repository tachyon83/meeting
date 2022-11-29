import { AppDataSource } from '../src/data-source'
import { setNow, TestRequest } from './testUtil'
import * as jwtSetting from '../src/configs/jwtSettings'

beforeAll(async () => await AppDataSource.initialize())
afterAll(async () => await AppDataSource.destroy())

describe('point', () => {
  beforeEach(async () => {
    // await AppDataSource.dropDatabase()
    // await AppDataSource.synchronize()
    await AppDataSource.synchronize(true)
  })

  test('place test1', async () => {
    setNow('2022-04-01 17:00:00')

    // u1
    const r1 = await TestRequest.postRequest({
      path: '/user',
      body: { username: 'abc', email: 'abcd@email.com', password: '1234' },
    })
    expect(r1.statusCode).toEqual(200)
    expect(r1.data.ok).toEqual(true)

    jest.spyOn(jwtSetting, 'jwtClaims').mockImplementationOnce(() => ({
      issuer: process.env.JWT_ISSUER,
      expiresIn: '5s',
      subject: jwtSetting.JWT_SUBJECT.ACCESS,
    }))

    // u1 login
    const r2 = await TestRequest.postRequest({
      path: '/user/login',
      body: { email: 'abcd@email.com', password: '1234' },
    })
    expect(r2.statusCode).toEqual(200)
    expect(r2.data.accessToken).not.toBeNull()
    const u1Token = r2.data.accessToken

    // 신림
    const r3 = await TestRequest.postRequestWithJwt({
      header: { key: 'JWT_ACCESS_TOKEN', value: u1Token },
      path: '/place',
      body: { location: '37.472, 126.9287' },
    })
    expect(r3.statusCode).toEqual(200)

    // 용산
    await TestRequest.postRequestWithJwt({
      header: { key: 'JWT_ACCESS_TOKEN', value: u1Token },
      path: '/place',
      body: { location: '37.5302, 126.9902' },
    })

    // 강남
    await TestRequest.postRequestWithJwt({
      header: { key: 'JWT_ACCESS_TOKEN', value: u1Token },
      path: '/place',
      body: { location: '37.49738, 127.02824' },
    })

    // 영등포
    await TestRequest.postRequestWithJwt({
      header: { key: 'JWT_ACCESS_TOKEN', value: u1Token },
      path: '/place',
      body: { location: '37.5250, 126.8971' },
    })

    await new Promise((resolve) => setTimeout(resolve, 5001))
    const e1 = await TestRequest.postRequestWithJwt({
      header: { key: 'JWT_ACCESS_TOKEN', value: u1Token },
      path: '/place',
      body: { location: '37.5250, 126.8972' },
    })
    expect(e1.statusCode).toEqual(401)
    expect(e1.message).toEqual('jwtExpired')

    // 아주 작은 반경
    const r4 = await TestRequest.postRequest({
      path: '/place/list',
      body: {
        location: '37.49735, 127.02823',
        radius: 0.1,
        numPoints: 50,
      },
    })
    expect(r4.statusCode).toEqual(200)
    expect(r4.data).toHaveLength(1)

    // 전체 좌표
    const r5 = await TestRequest.postRequest({
      path: '/place/list',
      body: {
        location: '37.49735, 127.02823',
        radius: 50,
        numPoints: 50,
      },
    })
    expect(r5.data).toHaveLength(4)

    // 적은 숫자의 포인트 요청
    const r6 = await TestRequest.postRequest({
      path: '/place/list',
      body: {
        location: '37.49735, 127.02823',
        radius: 50,
        numPoints: 2,
      },
    })
    expect(r6.data).toHaveLength(2)

    // radius, numPoints 없어도 동작 확인
    const r7 = await TestRequest.postRequest({
      path: '/place/list',
      body: {
        location: '37.49735, 127.02823',
      },
    })
    expect(r7.data.length).toBeGreaterThan(0)
  })
})
