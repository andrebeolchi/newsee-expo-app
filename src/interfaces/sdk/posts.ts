import { IPost } from "~/models/posts";
import { fetch } from ".";

// -- Get all posts, can filter by search

export interface IGetPostsPayload { search?: string; }
export type IGetPostsResponse = IPost[];

export const getPosts = async ({ search }: IGetPostsPayload): Promise<IGetPostsResponse> => {
  if (!search) {
    const { data } = await fetch.get("/posts");

    return data;
  }

  const { data } = await fetch.get("/posts/search?query=" + search);

  return data;
}

// -- Get post by id

export type IGetPostByIdPayload = Pick<IPost, "id">;
export type IGetPostByIdResponse = IPost;

export const getPostById = async ({ id }: IGetPostByIdPayload): Promise<IGetPostByIdResponse> => {
  const { data } = await fetch.get(`/posts/${id}`);

  return data;
}

// -- Create post

export type ICreatePostPayload = Pick<IPost, "title" | "content">;
export type ICreatePostResponse = IPost;

export const createPost = async ({ title, content }: ICreatePostPayload): Promise<ICreatePostResponse> => {
  const { data } = await fetch.post("/posts", {
    title,
    content
  });

  return data;
}

// -- Update post

export type IUpdatePostPayload = Pick<IPost, "id" | "title" | 'content'>
export type IUpdatePostResponse = IPost;

export const updatePost = async ({ id, title, content }: IUpdatePostPayload): Promise<IUpdatePostResponse> => {
  const { data } = await fetch.put(`/posts/${id}`, {
    title,
    content
  });

  return data;
}

// -- Delete post

export type IDeletePostPayload = Pick<IPost, "id">;
export type IDeletePostResponse = IPost;

export const deletePost = async ({ id }: IDeletePostPayload): Promise<IDeletePostResponse> => {
  const { data } = await fetch.delete(`/posts/${id}`);

  return data;
}