import { useQuery } from "@tanstack/react-query";

import { getPosts, IGetPostsPayload } from "~/interfaces/sdk/posts";

export const useGetPosts = (payload: IGetPostsPayload = {}) => useQuery({
  queryKey: ["posts", payload],
  queryFn: () => getPosts(payload),
})