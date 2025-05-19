import dayjs from 'dayjs';
import { Link, useRouter } from 'expo-router';
import { LucideEdit, LucideGraduationCap, LucideSearch, LucideSearchX, LucideShieldUser, LucideUsers, LucideX } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { Fab } from '~/components/fab';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/use-color-scheme';
import useDebounce from '~/lib/use-debounce';
import { IAuthUser } from '~/models/users';
import { useGetPosts } from '~/modules/posts';

export default function PostsScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme()
  const [user] = useMMKVObject<IAuthUser>('user');

  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 300);
  const { data, refetch, status } = useGetPosts({ search: debouncedSearch });

  return (
    <View className='flex-1 gap-6'>
      <View className='flex-row items-center justify-between'>
        <Text className='text-3xl font-bold'>
          Postagens
        </Text>

        <Pressable onPress={() => setShowSearch(!showSearch)}>
          {showSearch && <LucideSearchX size={24} />}
          {!showSearch && <LucideSearch size={24} />}
        </Pressable>
      </View>

      {showSearch && (
        <View>
          <Input
            placeholder='Pesquisar palavras-chave'
            value={search}
            onChangeText={setSearch}
            autoFocus
          />

          {search && (
            <Pressable
              className='absolute right-4 top-1/2 -translate-y-1/2'
              onPress={() => setSearch('')}
            >
              <LucideX size={16} />
            </Pressable>
          )}
        </View>
      )}

      <FlatList
        className='flex-1'
        refreshing={status === "pending"}
        onRefresh={refetch}
        data={data}
        keyExtractor={(item) => `${item.id}`}
        contentContainerClassName='gap-6 pb-24'
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/posts/${item.id}`)}
            className='group/card'
          >
            <Card className='group-active/card:bg-muted'>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription numberOfLines={1}>
                  {item.content}
                </CardDescription>
              </CardContent>

              <CardFooter>
                <View className='flex-1 gap-3'>
                  <View>
                    <Text className='text-sm text-muted-foreground italic'>
                      Postado por {item.author.fullName},
                    </Text>

                    <Text className='text-sm text-muted-foreground italic'>
                      {dayjs(item.createdAt).format('LLL')}
                    </Text>
                  </View>

                  {user?.role === 'teacher' && (
                    <View className='flex-row items-center gap-3'>
                      <Link
                        className='flex-1'
                        href={`/posts/${item.id}/edit`}
                        asChild
                      >
                        <Button variant='outline' className='flex-row gap-3'>
                          <Text className='text-destructive'>
                            Remover
                          </Text>
                        </Button>
                      </Link>

                      <Link
                        href={`/posts/${item.id}/edit`}
                        asChild
                        className='flex-1'
                      >
                        <Button variant='secondary' className='flex-row gap-3'>
                          <Text>
                            Editar
                          </Text>
                        </Button>
                      </Link>
                    </View>
                  )}
                </View>
              </CardFooter>
            </Card>
          </Pressable>
        )}
        ListEmptyComponent={() => (
          <View className='flex-1 items-center justify-center gap-3'>
            <Text className='text-lg font-bold'>
              Nenhuma postagem encontrada
            </Text>
          </View>
        )}
      />

      {
        user?.role === 'teacher' && (
          <Fab
            iconClosed={<LucideShieldUser size={32} color={NAV_THEME[colorScheme].background} />}
            iconOpened={<LucideX size={32} color={NAV_THEME[colorScheme].background} />}
            actions={[
              {
                icon: <LucideEdit size={24} />,
                onPress: () => router.push('/posts/new'),
              },
              {
                icon: <LucideGraduationCap size={24} />,
                onPress: () => router.push('/students'),
              },
              {
                icon: <LucideUsers size={24} />,
                onPress: () => router.push('/teachers'),
              },
            ]}
          />
        )
      }
    </View >
  );
}
