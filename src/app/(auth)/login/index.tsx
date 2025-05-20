import { useRouter } from "expo-router";
import { ArrowLeft, Eye, EyeClosed } from "lucide-react-native";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { useMMKVObject } from "react-native-mmkv";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { InjectClassName } from "~/lib/icons/iconWithClassName";
import { useLogin } from "~/modules/auth";

export default function LoginScreen() {
  const router = useRouter();
  const { mutateAsync, status } = useLogin();
  const [user] = useMMKVObject("user");

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const HidePasswordIcon = hidePassword ? Eye : EyeClosed;

  const handleLogin = async () => {
    try {
      await mutateAsync({ username, password });
      router.navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 p-safe-offset-6 bg-muted">
      <View className="gap-2">
        <Pressable
          className="flex flex-row items-center gap-2 py-2"
          onPress={() => router.push("/(general)/posts")}
        >
          <ArrowLeft />
          <Text>Voltar</Text>
        </Pressable>
        <View className="bg-background border border-border rounded-lg p-6 gap-9">
          <View>
            <Text className="text-3xl font-bold text-primary">
              Bem-vindo ao NewSee!
            </Text>
            <Text className="text-lg text-muted-foreground">
              Acompanhe as últimas postagens de seus professores
            </Text>
          </View>

          <View className="gap-3">
            <View className="gap-1">
              <Label>Usuário</Label>
              <Input
                autoCapitalize="none"
                onChangeText={setUsername}
                editable={status !== "pending"}
              />
            </View>

            <View className="gap-1">
              <Label>Senha</Label>

              <View>
                <Input
                  onChangeText={setPassword}
                  editable={status !== "pending"}
                  autoCapitalize="none"
                  secureTextEntry={hidePassword}
                  className="pr-12"
                />
                <Pressable
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onPress={() => setHidePassword(!hidePassword)}
                >
                  <InjectClassName>
                    <HidePasswordIcon
                      className="text-muted-foreground"
                      size={24}
                    />
                  </InjectClassName>
                </Pressable>
              </View>
            </View>
          </View>

          <View className="gap-3">
            <Button
              onPress={handleLogin}
              disabled={!username || !password || status === "pending"}
            >
              {status === "pending" && (
                <InjectClassName>
                  <ActivityIndicator size={16} />
                </InjectClassName>
              )}

              {status !== "pending" && <Text>Entrar</Text>}
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
