import { AppDataSource } from '../src/data-source'
import { setNow } from './testUtil'
import PlaceController from '../src/controllers/place.controller'
import { PlaceService } from '../src/services/place.service'

beforeAll(async () => {
  await AppDataSource.initialize()
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
    // const pCon=new PlaceController(new PlaceLogicCls())
    const PlaceLogic = new PlaceService()

    const p1 = await PlaceLogic.create({ location: '37.472, 126.9287' }) // 신림
    const p2 = await PlaceLogic.create({ location: '37.5302, 126.9902' }) // 용산
    const p3 = await PlaceLogic.create({ location: '37.49738, 127.02824' }) // 강남
    const p4 = await PlaceLogic.create({ location: '37.5250, 126.8971' }) // 영등포

    const l1 = await PlaceLogic.list({
      location: '37.49735, 127.02823',
      radius: 100,
      numPoints: 50,
    })
    // expect(l1).toHaveLength(1)
    console.log(l1)
  })
})
