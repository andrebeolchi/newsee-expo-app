import { useMutation } from "@tanstack/react-query";

import { queryClient, storage } from "~/components/query-provider";
import { removeAuthorizationHeader, setAuthorizationHeader } from "~/interfaces/sdk";
import { ILoginResponse, login } from "~/interfaces/sdk/auth";

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: ILoginResponse) => void;
  onError?: (error: unknown) => void;
} = {}) => useMutation({
  mutationFn: login,
  onSuccess: async (data: ILoginResponse) => {
    storage.set("user", JSON.stringify(data));
    setAuthorizationHeader(data.token);
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
    storage.clearAll();
    queryClient.clear();
    onSuccess && onSuccess?.();
  },
  onError: (error: unknown) => {
    onError && onError?.(error);
  },
})