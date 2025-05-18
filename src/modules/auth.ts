import { useMutation } from "@tanstack/react-query";

import { removeAuthorizationHeader, setAuthorizationHeader } from "@/interfaces/sdk";
import { ILoginResponse, login } from "@/interfaces/sdk/auth";

import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: ILoginResponse) => void;
  onError?: (error: unknown) => void;
} = {}) => useMutation({
  mutationFn: login,
  onSuccess: async (data: ILoginResponse) => {
    console.log("Login success", data);
    await AsyncStorage.setItem("user", JSON.stringify(data));
    setAuthorizationHeader(data.token);

    onSuccess && onSuccess?.(data);
  },
  onError: (error: unknown) => {
    onError && onError?.(error);
  },
})

export const useLogout = () => useMutation({
  mutationFn: async () => {
    removeAuthorizationHeader();
    await AsyncStorage.removeItem("token");
  },
})

export const useAuth = () => {
  const { getItem } = useAsyncStorage("user")
  const [data, setData] = useState<ILoginResponse | null>(null)

  const getUser = async () => {
    const user = await getItem()
    if (user) {
      const parsedUser = JSON.parse(user)
      setData(parsedUser)
      setAuthorizationHeader(parsedUser.token)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return { data }
}