export interface IUserModel {
  username: string;
  email: string;
  authenticated: number;
  status: number;
  token: string;
  id: string;
}

export interface ILocationModel {
  latitude: number;
  longitude: number;
}

export interface IEventModel {
  headline: string;
  status: number;
  userId: string;
  eventDate: string;
  dateAdded: string;
  description: string;
  image: string;
  location: ILocationModel;
  address: IAddressModel;
  eventTime: any;
  id: string;
}

export interface ICommentModel {
  id: string;
  text: string;
  userEmail: string;
  dateAdded: string;
  status: number;
}

export interface IAdminModel {
  username: string;
  email: string;
  role: number;
  status: number;
  dateAdded: string;
  profilePicture: string;
  token: string;
  id: string;
}
export interface IAddressModel {
  zipcode: string;
  street: string;
  city: string;
  state: string;
  id: string;
}

export interface IAuthModel {
  userId: string;
  password: string;
  otp: string;
}
