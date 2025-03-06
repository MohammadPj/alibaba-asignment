export interface ILocation {
  long: number
  lat: number
}

export interface IGetHotel {
  name: string
  description: string
  location: ILocation
  stars: number
  id: string
}
