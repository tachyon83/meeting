import { AppDataSource } from '../data-source'
import { Favorite } from '../modules/Favorite'
import { Repository } from 'typeorm'
import {
  IFavoriteCreateInput,
  IFavoriteUpdateInput,
  IFavoriteDeleteInput,
} from '../interfaces/favorite.interface'
import { isLocationFormatValid, locationConverter } from '../utils/place/utils'
import * as PlaceException from '../exceptions/place'
import * as FavoriteException from '../exceptions/favorite'
import { IOkOuput } from '../interfaces/common.interface'

export class FavoriteService {
  private repo: Repository<Favorite>

  constructor() {
    this.repo = AppDataSource.getRepository(Favorite)
  }

  async create(data: IFavoriteCreateInput, userId: number): Promise<Favorite> {
    const { location } = data
    if (!isLocationFormatValid(location))
      throw new PlaceException.LocationFormatInvalidException()

    const favorites = await this.repo.find({ where: { userId } })
    if (favorites.length >= 3)
      throw new FavoriteException.NoMoreFavoriteException()

    const inst = await this.repo.create({
      location: locationConverter(location),
      userId,
    })
    await this.repo.insert(inst)
    return this.repo.findOne({ where: { favoriteId: inst.favoriteId } })
  }

  async update(data: IFavoriteUpdateInput, userId: number): Promise<Favorite> {
    const { location, favoriteId } = data
    if (!isLocationFormatValid(location))
      throw new PlaceException.LocationFormatInvalidException()

    const favorite = await this.repo.findOne({ where: { favoriteId } })
    if (!favorite) throw new FavoriteException.FavoriteDoesNotExistException()

    if (favorite.userId !== userId)
      throw new FavoriteException.UnAuthorizedException()

    await this.repo.update(
      { favoriteId },
      { location: locationConverter(location) }
    )
    return this.repo.findOne({ where: { favoriteId } })
  }

  async delete(data: IFavoriteDeleteInput, userId: number): Promise<IOkOuput> {
    const { favoriteId } = data

    const favorite = await this.repo.findOne({ where: { favoriteId } })
    if (!favorite) throw new FavoriteException.FavoriteDoesNotExistException()

    if (favorite.userId !== userId)
      throw new FavoriteException.UnAuthorizedException()

    const { affected } = await this.repo.delete({ favoriteId })
    return { ok: affected && affected > 0 }
  }
}
