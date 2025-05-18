import { Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { AuthHeader } from '~/components/header';

export default function AuthLayout() {
  return (
    <View className='flex-1 bg-muted pb-safe'>
      <AuthHeader />

      <View className='flex-1 p-6'>
        <Slot />
      </View>
    </View>
  );
}
