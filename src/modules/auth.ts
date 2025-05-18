import { useMutation, useQuery } from "@tanstack/react-query";

import { removeAuthorizationHeader, setAuthorizationHeader } from "@/interfaces/sdk";
import { ILoginResponse, login } from "@/interfaces/sdk/auth";

import { queryClient } from "~/components/query-provider";

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: ILoginResponse) => void;
  onError?: (error: unknown) => void;
} = {}) => useMutation({
  mutationFn: login,
  onSuccess: async (data: ILoginResponse) => {
    setAuthorizationHeader(data.token);
    queryClient.setQueryData(["auth"], data);
    onSuccess && onSuccess?.(data);
  },
  onError: (error: unknown) => {
    onError && onError?.(error);
  },
})

export const useLogout = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => useMutation({
  mutationFn: async () => {
    removeAuthorizationHeader();
  },
  onSuccess: () => {
    queryClient.clear();
    onSuccess && onSuccess?.();
  },
  onError: (error: unknown) => {
    onError && onError?.(error);
  },
})