import { AppDataSource } from '../data-source'
import * as UserException from '../exceptions/user/index'
import * as UserUtil from '../utils/user/utils'
import { IOkOuput } from '../interfaces/common.interface'
import { IUserCreationInput, IUserLoginInput } from '../interfaces/user.interface'
import { User } from '../modules/User'

export default class UserService {
    private repo = AppDataSource.getRepository(User)

    async create(data: IUserCreationInput): Promise<IOkOuput> {
        const { username, password, email } = data

        const isEmailFormatOk = UserUtil.isValidEmail(email)
        if (!isEmailFormatOk) throw new UserException.EmailFormatIncorrectException()

        const existingUser = await this.repo.findOne({ where: { email } })
        if (existingUser) throw new UserException.EmailAlreadyExistsException()

        const hashedPassword = await UserUtil.getHashedPassword(password)
        const inst = await this.repo.create({
            username,
            email,
            password: hashedPassword
        })
        const { identifiers } = await this.repo.insert(inst)
        return { ok: identifiers && identifiers.length > 0 }

        // const createdUser = await this.repo.findOne({ where: { userId: identifiers[0].userId } })
        // createdUser.password = undefined
        // return createdUser
    }

    async login(data: IUserLoginInput): Promise<User> {
        const { email, password } = data
        const existingUser = await this.repo.findOne({ where: { email } })
        if (!existingUser) throw new UserException.UserDoesNotExistException()

        const isPwCorrect = await UserUtil.comparePassword(password, existingUser.password)
        if (!isPwCorrect) throw new UserException.PasswordIncorrectException()

        existingUser.password = undefined
        return existingUser
    }

    // async get(userId: number): Promise<{}> {
    //     const { affected } = await this.repo.delete({ userId })
    //     if (!affected || affected <= 0) return new Error()

    //     return { ok: 1 }
    // }

    // async update(newUserName: string, userId: number): Promise<User> {
    //     const { affected } = await this.repo.update({ userId }, { username: newUserName })
    //     if (!affected || affected <= 0) throw new Error()

    //     return this.repo.findOne({ where: { userId } })
    // }
}
