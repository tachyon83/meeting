export interface IFavoriteCreateInput {
  location: string
}

export interface IFavoriteUpdateInput {
  favoriteId: number
  location: string
}

export interface IFavoriteDeleteInput {
  favoriteId: number
}
