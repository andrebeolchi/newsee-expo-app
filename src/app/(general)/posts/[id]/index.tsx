import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { useGetPost } from '~/modules/posts';

export default function PostScreen() {
  const localParams = useLocalSearchParams() as { id: string };
  const { data } = useGetPost(`${localParams.id}`);

  return (
    <ScrollView className='flex-1 gap-6'>
      <View className='gap-6'>
        <Text className='text-3xl font-bold'>
          {data?.title}
        </Text>

        <Text className=''>
          {data?.content}
        </Text>

        <View>
          <Text className='text-sm text-muted-foreground italic'>
            Postado por {data?.author?.fullName},
          </Text>

          <Text className='text-sm text-muted-foreground italic'>
            {dayjs(data?.createdAt).format('LLL')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
