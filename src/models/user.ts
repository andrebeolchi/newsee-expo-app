export interface User {
  username: string,
  fullName: string,
  email: string,
  birthday: Date,
  createdAt: Date,
  updatedAt: Date
}

export interface AuthUser extends User { token: string }