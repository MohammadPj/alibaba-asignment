export interface ILocation {
  lng: number;
  lat: number;
}

export interface IComment {
  user: string;
  rating: number;
  text: string;
}

export interface IGetHotel {
  name: string;
  description: string;
  location: ILocation;
  stars: number;
  id: string;
  comments: IComment[];
}
