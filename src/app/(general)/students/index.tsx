import { Link, useRouter } from 'expo-router';
import { LucideEdit, LucideTrash } from 'lucide-react-native';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Fab } from '~/components/fab';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';
import { useGetStudents } from '~/modules/users';

[
  LucideEdit,
  LucideTrash,
].forEach(iconWithClassName);

export default function StudentsScreen() {
  const router = useRouter();
  const { data, refetch, status } = useGetStudents()

  return (
    <View className='flex-1 gap-6'>
      <View className='flex-row items-center justify-between'>
        <Text className='text-3xl font-bold'>
          Alunos
        </Text>
      </View>

      <FlatList
        className='flex-1'
        refreshing={status === "pending"}
        onRefresh={refetch}
        data={data}
        keyExtractor={(item) => `${item.id}`}
        contentContainerClassName='gap-6 pb-24'
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className='flex-row items-center p-6 bg-card border border-border rounded-lg'>
            <View className='flex-1'>
              <Text className='text-lg font-bold'>
                {item.fullName}
              </Text>

              <Text className='text-sm text-muted-foreground'>
                {item.email}
              </Text>
            </View>

            <View className='flex-row items-center gap-3'>
              <Button size='icon' variant='outline'>
                <LucideTrash size={16} className='text-destructive' />
              </Button>

              <Link asChild href={`/students/${item.id}/edit`}>
                <Button size='icon' variant='outline'>
                  <LucideEdit size={16} />
                </Button>
              </Link>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className='flex-1 items-center justify-center gap-3'>
            <Text className='text-lg font-bold'>
              Nenhum aluno encontrado.
            </Text>
          </View>
        )}
      />

      <Fab onPress={() => router.navigate('/students/new')}>
        <LucideEdit size={24} className='text-primary-foreground' />
      </Fab>
    </View>
  );
}
