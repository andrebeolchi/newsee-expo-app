enum UserRole {
  student,
  teacher,
}

export interface IUser {
  id: string,
  role: UserRole,
  username: string,
  fullName: string,
  email: string,
  birthday: Date,
  createdAt: Date,
  updatedAt: Date
}

export interface IAuthUser extends IUser { token: string }