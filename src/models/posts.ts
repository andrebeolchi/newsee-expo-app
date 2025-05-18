export interface IPost {
  id: string,
  title: string,
  content: string,
  createdAt: Date,
  updatedAt: Date,
  author: {
    id: string,
    fullName: string,
    username: string,
    email: string,
    createdAt: Date,
    updatedAt: Date
  }
}