import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { BackButton } from '~/components/back-button';
import { Text } from '~/components/ui/text';
import { IAuthUser } from '~/models/users';
import { useGetPost } from '~/modules/posts';

const TeacherPostScreen = () => {
  const localParams = useLocalSearchParams() as { id: string };
  const { data } = useGetPost(`${localParams.id}`);

  return (
    <View>
      <Text>
        Teacher Post Screen
      </Text>
    </View>
  );
}

const StudentPostScreen = () => {
  const localParams = useLocalSearchParams() as { id: string };
  const { data } = useGetPost(`${localParams.id}`);

  return (
    <ScrollView className='flex-1 gap-6'>
      <View className='gap-6'>
        <Text className='text-3xl font-bold'>
          {data?.title}
        </Text>

        <Text>
          {data?.content}
        </Text>

        <View>
          <Text className='text-sm text-muted-foreground'>
            Postado por {data?.author?.fullName},
          </Text>

          <Text className='text-sm text-muted-foreground'>
            {dayjs(data?.createdAt).format('LLL')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default function PostScreen() {
  const [user] = useMMKVObject<IAuthUser>('user');

  return (
    <View className='flex-1 gap-6'>
      <BackButton />

      {user?.role !== 'teacher' && <TeacherPostScreen />}
      {user?.role !== 'student' && <StudentPostScreen />}
    </View>
  )
}
