import { AppDataSource } from '../src/data-source'
import { setNow } from './testUtil'
import * as supertest from 'supertest'
import App from '../src/app'

var request

beforeAll(async () => {
  await AppDataSource.initialize()
  request = supertest(new App().app)
})
afterAll(async () => {
  await AppDataSource.destroy()
})

describe('point', () => {
  beforeEach(async () => {
    // await AppDataSource.dropDatabase()
    // await AppDataSource.synchronize()
    await AppDataSource.synchronize(true)
  })

  test('place test1', async () => {
    setNow('2022-04-01')

    // 신림
    const res1 = await request
      .post('/place')
      .send({ location: '37.472, 126.9287' })
    expect(res1.statusCode).toEqual(200)

    // 용산
    await request.post('/place').send({ location: '37.5302, 126.9902' })

    // 강남
    await request.post('/place').send({ location: '37.49738, 127.02824' })

    // 영등포
    await request.post('/place').send({ location: '37.5250, 126.8971' })

    // 아주 작은 반경
    const res2 = await request.post('/place/list').send({
      location: '37.49735, 127.02823',
      radius: 0.1,
      numPoints: 50,
    })
    expect(res2.statusCode).toEqual(200)
    const l2 = JSON.parse(res2.text)
    expect(l2.data).toHaveLength(1)

    // 전체 좌표
    const res3 = await request.post('/place/list').send({
      location: '37.49735, 127.02823',
      radius: 50,
      numPoints: 50,
    })
    const l3 = JSON.parse(res3.text)
    expect(l3.data).toHaveLength(4)

    // 적은 숫자의 포인트 요청
    const res4 = await request.post('/place/list').send({
      location: '37.49735, 127.02823',
      radius: 50,
      numPoints: 2,
    })
    const l4 = JSON.parse(res4.text)
    expect(l4.data).toHaveLength(2)
  })
})
