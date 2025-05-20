import { useRouter } from "expo-router";
import { LucideLogIn, LucideLogOut } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { useMMKVObject } from "react-native-mmkv";

import { Text } from "~/components/ui/text";
import { InjectClassName } from "~/lib/icons/iconWithClassName";
import { IAuthUser } from "~/models/users";
import { useLogout } from "~/modules/auth";

export const greetings = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Bom dia,";
  if (hour < 18) return "Boa tarde,";
  if (hour < 24) return "Boa noite,";

  return "Olá,";
};

export const AuthHeader = () => {
  const router = useRouter();
  const [user] = useMMKVObject<IAuthUser>("user");

  const { mutateAsync, status } = useLogout({
    onSuccess: () => {
      router.navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogout = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-row items-center justify-center bg-background border-b border-b-border pt-safe-offset-6 p-6">
      <View className="flex-1">
        <Text className="text-sm">{greetings()}</Text>

        <Text className="font-bold" numberOfLines={1}>
          {user?.fullName ?? "Visitante"}
        </Text>
      </View>

      <Pressable
        onPress={() => {
          if (user?.id) handleLogout();
          else router.navigate("/login");
        }}
        disabled={status === "pending"}
        className="flex flex-row items-center gap-2"
      >
        {status === "pending" && (
          <InjectClassName>
            <ActivityIndicator size={20} className="text-primary" />
          </InjectClassName>
        )}
        {status !== "pending" && (
          <InjectClassName>
            {user?.id && <LucideLogOut size={20} className="text-primary" />}
            {!user?.id && <LucideLogIn size={20} className="text-primary" />}
          </InjectClassName>
        )}
      </Pressable>
    </View>
  );
};
