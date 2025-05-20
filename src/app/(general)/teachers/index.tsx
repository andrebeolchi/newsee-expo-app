import { Link, useRouter } from "expo-router";
import { LucideEdit, LucideTrash } from "lucide-react-native";
import React from "react";
import { FlatList, View } from "react-native";
import { useMMKVObject } from "react-native-mmkv";
import { Fab } from "~/components/fab";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { iconWithClassName } from "~/lib/icons/iconWithClassName";
import { IAuthUser, IUser } from "~/models/users";
import { useDeleteUser, useGetTeachers } from "~/modules/users";

[LucideEdit, LucideTrash].forEach(iconWithClassName);

const DeleteTeacherDialog = ({ data }: { data: IUser }) => {
  const [user] = useMMKVObject<IAuthUser>("user");
  const { mutateAsync } = useDeleteUser();

  const handleDelete = async () => {
    try {
      await mutateAsync(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="outline" disabled={user?.id === data.id}>
          <LucideTrash size={16} className="text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir professor</AlertDialogTitle>
          <AlertDialogDescription>
            <Text className="text-muted-foreground">
              Você tem certeza que deseja excluir o professor{" "}
              <Text className="font-medium">{data.fullName}</Text>?
            </Text>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>Cancelar</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={() => handleDelete()}>
            <Text>Sim! Excluir professor</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default function TeachersScreen() {
  const router = useRouter();
  const { data, refetch, status } = useGetTeachers();

  return (
    <View className="flex-1 gap-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-3xl font-bold">Professores</Text>
      </View>

      <FlatList
        className="flex-1"
        refreshing={status === "pending"}
        onRefresh={refetch}
        data={data}
        keyExtractor={(item) => `${item.id}`}
        contentContainerClassName="gap-6 pb-24"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="flex-row items-center p-6 bg-card border border-border rounded-lg">
            <View className="flex-1">
              <Text className="text-lg font-bold">{item.fullName}</Text>

              <Text className="text-sm text-muted-foreground">
                {item.email}
              </Text>
            </View>

            <View className="flex-row items-center gap-3">
              <DeleteTeacherDialog data={item} />

              <Link href={`/teachers/${item.id}/edit`} asChild>
                <Button size="icon" variant="outline">
                  <LucideEdit size={16} />
                </Button>
              </Link>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center gap-3">
            <Text className="text-lg font-bold">
              Nenhum professor encontrado.
            </Text>
          </View>
        )}
      />

      <Fab onPress={() => router.navigate("/teachers/new")}>
        <LucideEdit size={24} className="text-primary-foreground" />
      </Fab>
    </View>
  );
}
