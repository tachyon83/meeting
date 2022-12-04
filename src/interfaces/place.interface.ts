export interface IPlaceCreateInput {
  location: string
}

export interface IPlaceListInput {
  location: string
  radius?: number // radius in kilometers
  numPoints?: number
}
