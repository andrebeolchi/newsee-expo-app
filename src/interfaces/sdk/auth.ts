import { fetch } from ".";

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

export const login = async ({ username, password }: ILoginPayload): Promise<ILoginResponse> => {
  console.log({ username, password })
  const { data, request } = await fetch.post("/sign-in", {
    username,
    password,
  });

  console.log({ data, request });

  return data;
}