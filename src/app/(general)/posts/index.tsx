import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { LucideEdit, LucideGraduationCap, LucideShieldUser, LucideUsers, LucideX } from 'lucide-react-native';
import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { Fab } from '~/components/fab';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/use-color-scheme';
import { IAuthUser } from '~/models/users';
import { useGetPosts } from '~/modules/posts';

export default function PostsScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme()
  const [user] = useMMKVObject<IAuthUser>('user');
  const { data, refetch, status } = useGetPosts();

  return (
    <View className='flex-1 gap-6'>
      <Text className='text-3xl font-bold'>
        Postagens
      </Text>

      <FlatList
        className='flex-1'
        refreshing={status === "pending"}
        onRefresh={refetch}
        data={data}
        keyExtractor={(item) => `${item.id}`}
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
                <View>
                  <Text className='text-sm text-muted-foreground'>
                    Postado por {item.author.fullName},
                  </Text>

                  <Text className='text-sm text-muted-foreground'>
                    {dayjs(item.createdAt).format('LLL')}
                  </Text>
                </View>
              </CardFooter>
            </Card>
          </Pressable>
        )}
      />

      {user?.role === 'teacher' && (
        <Fab
          iconClosed={<LucideShieldUser size={32} color={NAV_THEME[colorScheme].background} />}
          iconOpened={<LucideX size={32} color={NAV_THEME[colorScheme].background} />}
          actions={[
            {
              icon: <LucideEdit size={24} />,
              onPress: () => router.push('/posts/create'),
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
      )}
    </View>
  );
}
