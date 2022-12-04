import { AppDataSource } from '../data-source'
import * as UserException from '../exceptions/user/index'
import * as UserUtil from '../utils/user/utils'
import { IOkOuput } from '../interfaces/common.interface'
import {
  IUserCreateInput,
  IUserGetOutput,
  IUserLoginInput,
  IUserLoginOutput,
} from '../interfaces/user.interface'
import { User } from '../modules/User'
import * as JwtUtils from '../utils/jwt/jwtUtils'
import { Favorite } from '../modules/Favorite'

export default class UserService {
  private repo = AppDataSource.getRepository(User)
  private favoriteRepo = AppDataSource.getRepository(Favorite)

  async create(data: IUserCreateInput): Promise<IOkOuput> {
    const { username, password, email } = data

    if (!UserUtil.isValidEmail(email))
      throw new UserException.EmailFormatIncorrectException()

    const existingUser = await this.repo.findOne({ where: { email } })
    if (existingUser) throw new UserException.EmailAlreadyExistsException()

    const hashedPassword = await UserUtil.getHashedPassword(password)
    const inst = await this.repo.create({
      username,
      email,
      password: hashedPassword,
    })
    const { identifiers } = await this.repo.insert(inst)
    return { ok: identifiers && identifiers.length > 0 }
  }

  async login(data: IUserLoginInput): Promise<IUserLoginOutput> {
    const { email, password } = data
    const existingUser = await this.repo.findOne({ where: { email } })
    if (!existingUser) throw new UserException.UserDoesNotExistException()

    const isPwCorrect = await UserUtil.comparePassword(
      password,
      existingUser.password
    )
    if (!isPwCorrect) throw new UserException.PasswordIncorrectException()

    existingUser.password = undefined
    return {
      user: existingUser,
      accessToken: JwtUtils.sign({
        userId: existingUser.userId,
        username: existingUser.username,
      }),
    }
  }

  async get(userId: number): Promise<IUserGetOutput> {
    const user = await this.repo.findOne({ where: { userId } })
    if (!user) throw new UserException.UserDoesNotExistException()

    user.password = undefined

    const favorites = await this.favoriteRepo.find({ where: { userId } })
    return { user, favorites }
  }

  // async update(newUserName: string, userId: number): Promise<User> {
  //     const { affected } = await this.repo.update({ userId }, { username: newUserName })
  //     if (!affected || affected <= 0) throw new Error()

  //     return this.repo.findOne({ where: { userId } })
  // }
}
