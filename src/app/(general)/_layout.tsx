import { Redirect, Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';

import { AuthHeader } from '@/components/header';

export default function AuthLayout() {
  const [user] = useMMKVObject('user')

  if (!user) {
    return <Redirect href='/' />
  }

  return (
    <View className='flex-1 items-center justify-center bg-muted'>
      <AuthHeader />
      
      <View className='flex-1'>
        <Slot />
      </View>
    </View>
  );
}
