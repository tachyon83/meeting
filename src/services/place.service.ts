import { AppDataSource } from '../data-source'
import { Place } from '../modules/Place'
import { Repository } from 'typeorm'
import {
  IPlaceCreationInput,
  IPlaceListInput,
} from '../interfaces/place.interface'
import { locationConverter } from '../utils/place/utils'

export class PlaceService {
  private repo: Repository<Place>

  constructor() {
    this.repo = AppDataSource.getRepository(Place)
  }

  async create(data: IPlaceCreationInput, userId: number) {
    const { location } = data
    const inst = await this.repo.create({
      location: locationConverter(location),
      userId,
    })
    await this.repo.insert(inst)
    return this.repo.findOne({ where: { placeId: inst.placeId } })
  }

  async list(data: IPlaceListInput) {
    // radius in kilometers
    const { location, radius, numPoints } = data
    const diff = (Math.min(radius ?? 50, 50) * 1.3) / 111
    const size = Math.min(numPoints ?? 500, 500)
    const [lat, lng] = location.split(',').map((e) => Number(e))

    return this.repo
      .createQueryBuilder()
      .select()
      .addSelect(
        `ST_DISTANCE_SPHERE(ST_GeomFromText('POINT(:lat :lng)',4326), location)`,
        'distance'
      )
      .where(
        `MBRContains(ST_GeomFromText(ST_AsText(ST_Envelope(linestring(
            point((:lat+:diff), (:lng+:diff)),
            point((:lat-:diff), (:lng-:diff))
          ))),4326),
          location
        )`
      )
      .setParameters({ lat, lng, diff })
      .orderBy('distance', 'ASC')
      .limit(size)
      .getMany()
  }
}
