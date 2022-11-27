export interface IUserCreationInput {
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
  email?: string
  password?: string
}