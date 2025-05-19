import { IUser, UserRole } from "~/models/users";
import { fetch } from ".";

// -- Get all users
export type IGetUsersPayload = { role?: string };
export type IGetUsersResponse = IUser[];

export const getUsers = async ({ role }: IGetUsersPayload = {}): Promise<IGetUsersResponse> => {
  const url = role ? `/users?role=${role}` : "/users";

  const { data } = await fetch.get(url);

  return data;
}

// -- Get user
export type IGetUserPayload = Pick<IUser, "id">
export type IGetUserResponse = IUser;

export const getUser = async ({ id }: IGetUserPayload): Promise<IGetUserResponse> => {
  const { data } = await fetch.get(`/users/${id}`);

  return data;
}

// -- Create user
export type ICreateUserPayload = Pick<IUser, "email" | "fullName" | "birthday" | "username" | "role">
export type ICreateUserResponse = IUser;

export const createUser = async (payload: ICreateUserPayload) => {
  const [year] = payload.birthday.split("-");
  const password = `${payload.username}@${year}`;

  const { data } = await fetch.post("/users", {
    ...payload,
    password,
  });

  return data;
}

// -- Update User

export type IUpdateUserPayload = Pick<IUser, "id" | "email" | "fullName" | "birthday" | "username">
export type IUpdateUserResponse = IUser;

export const updateUser = async ({ id, ...payload }: IUpdateUserPayload) => {
  const { data } = await fetch.put(`/users/${id}`, payload);

  return data;
}

// -- Delete User

export type IDeleteUserPayload = Pick<IUser, "id">
export type IDeleteUserResponse = IUser;

export const deleteUser = async ({ id }: IDeleteUserPayload) => {
  const { data } = await fetch.delete(`/users/${id}`);

  return data;
}

// -- Create student

export type ICreateStudentPayload = Pick<IUser, "email" | "fullName" | "birthday" | "username">
export type ICreateStudentResponse = IUser;

export const createStudent = (payload: ICreateStudentPayload) => createUser({ ...payload, role: UserRole.student });

// -- Create teacher

export type ICreateTeacherPayload = Pick<IUser, "email" | "fullName" | "birthday" | "username">
export type ICreateTeacherResponse = IUser;

export const createTeacher = (payload: ICreateTeacherPayload) => createUser({ ...payload, role: UserRole.teacher });