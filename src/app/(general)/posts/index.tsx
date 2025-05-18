import React from 'react';
import { FlatList, View } from 'react-native';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { useGetPosts } from '~/modules/posts';

export default function PostsScreen() {
  const { data } = useGetPosts();

  return (
    <View className='flex-1 gap-6'>
      <Text className='text-3xl font-bold'>
        Postagens
      </Text>

      <FlatList
        className='flex-1'
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
    </View>
  );
}
