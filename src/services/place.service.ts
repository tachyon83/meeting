import { AppDataSource } from '../data-source'
import { Place } from '../modules/Place/Place'
import { CommonUtils } from '../utils/CommonUtils'
import { Repository } from 'typeorm'

export class PlaceService {
  private repo: Repository<Place>

  constructor() {
    this.repo = AppDataSource.getRepository(Place)
  }

  async create(data) {
    const { location } = data
    const inst = await this.repo.create({
      location: this.locationConverter(location),
    })
    await this.repo.insert(inst)
  }

  async list(data) {
    // radius in kilometers
    const { location, radius, numPoints } = data
    const diff = (Math.min(radius, 50) * 1.3) / 111
    const size = Math.min(numPoints, 500)
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

  private locationConverter(location: string): string {
    const p = location
      .split(',')
      .map((v) => v.trim())
      .join(' ')
    return `POINT(${p})`
  }
}
