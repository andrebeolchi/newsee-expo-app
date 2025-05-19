import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "~/components/query-provider";

import { createPost, getPostById, getPosts, IGetPostsPayload, updatePost } from "~/interfaces/sdk/posts";
import { IPost } from "~/models/posts";

export const useGetPosts = (payload: IGetPostsPayload = {}) => useQuery({
  queryKey: ["posts", payload],
  queryFn: () => getPosts(payload),
})

export const useGetPost = (id: string) => useQuery({
  queryKey: ["posts", id],
  queryFn: () => getPostById({ id }),
  enabled: !!id,
})

export const useCreatePost = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: IPost) => void;
  onError?: (error: any) => void;
}) => useMutation({
  mutationFn: createPost,
  onSuccess: (data) => {
    queryClient.setQueryData(["posts", data.id], data);
    queryClient.setQueryData(["posts"], (oldData?: IPost[]) => {
      if (!oldData) return [data];
      return [data, ...oldData];
    })

    queryClient.invalidateQueries({ queryKey: ["posts"] });
    
    onSuccess?.(data);
  },
  onError: (error) => {
    onError?.(error);
  },
})

export const useUpdatePost = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: IPost) => void;
  onError?: (error: any) => void;
}) => useMutation({
  mutationFn: updatePost,
  onSuccess: (data) => {
    queryClient.setQueryData(["posts", data.id], data);
    queryClient.setQueryData(["posts"], (oldData?: IPost[]) => {
      if (!oldData) return [data];
      return oldData.map((post) => post.id === data.id ? data : post);
    })

    queryClient.invalidateQueries({ queryKey: ["posts"] });

    onSuccess?.(data);
  },
  onError: (error) => {
    onError?.(error);
  },
})