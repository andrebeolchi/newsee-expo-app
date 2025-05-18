import { IPost } from "~/models/posts";
import { fetch } from ".";

export interface IGetPostsPayload {
  search?: string;
}

export type IGetPostsResponse = IPost[];

export const getPosts = async ({ search }: IGetPostsPayload): Promise<IGetPostsResponse> => {
  if (!search) {
    const { data } = await fetch.get("/posts");

    return data;
  }

  const { data } = await fetch.get("/posts/search?query=" + search);

  return data;
}