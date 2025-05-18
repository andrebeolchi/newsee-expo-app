import { IAuthUser } from "~/src/models/user";
import { fetch } from ".";

export interface ILoginPayload {
  username: string;
  password: string;
}

export type ILoginResponse = IAuthUser;

export const login = async ({ username, password }: ILoginPayload): Promise<ILoginResponse> => {
  const { data } = await fetch.post("/sign-in", {
    username,
    password,
  });

  return data;
}