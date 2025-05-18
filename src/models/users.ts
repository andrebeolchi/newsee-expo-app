export interface IUser {
  username: string,
  fullName: string,
  email: string,
  birthday: Date,
  createdAt: Date,
  updatedAt: Date
}

export interface IAuthUser extends IUser { token: string }