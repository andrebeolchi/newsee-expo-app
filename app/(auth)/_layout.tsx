import { Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { AuthHeader } from '~/components/header';

export default function AuthLayout() {
  return (
    <View className='flex-1 items-center justify-center p-safe bg-muted'>
      <AuthHeader />
      
      <View className='flex-1'>
        <Slot />
      </View>
    </View>
  );
}
