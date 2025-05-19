export enum UserRole {
  student = 'student',
  teacher = 'teacher',
}

export interface IUser {
  id: string,
  role: UserRole,
  username: string,
  fullName: string,
  email: string,
  birthday: string,
  createdAt: Date,
  updatedAt: Date
}

export interface IAuthUser extends IUser { token: string }