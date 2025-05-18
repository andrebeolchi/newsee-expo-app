import { useQuery } from "@tanstack/react-query";

import { getPostById, getPosts, IGetPostsPayload } from "~/interfaces/sdk/posts";

export const useGetPosts = (payload: IGetPostsPayload = {}) => useQuery({
  queryKey: ["posts", payload],
  queryFn: () => getPosts(payload),
})

export const useGetPost = (id: string) => useQuery({
  queryKey: ["posts", id],
  queryFn: () => getPostById({ id }),
  enabled: !!id,
})