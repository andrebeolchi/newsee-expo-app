import { useRouter } from 'expo-router';
import { LucideLogOut } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';

import { InjectClassName } from '@/lib/icons/iconWithClassName';
import { Text } from '~/components/ui/text';
import { useLogout } from '~/src/modules/auth';

export const greetings = () => {
  const hour = new Date().getHours();

  if (hour < 6) return 'Boa madrugada,';
  if (hour < 12) return 'Bom dia,';
  if (hour < 18) return 'Boa tarde,';
  if (hour < 24) return 'Boa noite,';

  return 'Olá,';
}

export const AuthHeader = () => {
  const router = useRouter();
  const [user] = useMMKVObject('user');

  const { mutateAsync, status } = useLogout({
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const handleLogout = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className='flex-row items-center justify-center bg-background border-b border-b-border p-6'>
      <View className='flex-1'>
        <Text className='text-sm'>
          {greetings()}
        </Text>

        <Text className='font-bold' numberOfLines={1}>
          {user?.fullName}
        </Text>
      </View>

      <Pressable
        onPress={() => handleLogout()}
        disabled={status === 'pending'}
      >
        {status === 'pending' && (
          <InjectClassName>
            <ActivityIndicator size={20} className='text-primary' />
          </InjectClassName>
        )}
        {status !== 'pending' && (
          <InjectClassName>
            <LucideLogOut size={20} className='text-primary' />
          </InjectClassName>
        )}
      </Pressable>
    </View>
  );
}