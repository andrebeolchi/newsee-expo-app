import { useRouter } from 'expo-router';
import { LucideEdit, LucideGraduationCap, LucideShieldUser, LucideUsers, LucideX } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { Fab } from '~/components/fab';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
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

  const [fabOpen, setFabOpen] = useState<boolean>(false)

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
          <Card>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <CardDescription numberOfLines={1}>
                {item.content}
              </CardDescription>
            </CardContent>
          </Card>
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
