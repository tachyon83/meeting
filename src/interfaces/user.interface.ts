import { User } from '../modules/User'
import { Favorite } from '../modules/Favorite'

export interface IUserCreateInput {
  username: string
  email: string
  password: string
}

export interface IUserLoginInput {
  email: string
  password: string
}

export interface IUserUpdateInput {
  username?: string
  // email?: string
  password?: string
}

export interface IUserLoginOutput {
  user: User
  accessToken: string
}

export interface IUserGetOutput {
  user: User
  favorites: Favorite[]
}
