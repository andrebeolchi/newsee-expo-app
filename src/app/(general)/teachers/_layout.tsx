import { Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { BackButton } from '~/components/back-button';

export default function TeachersLayout() {
  return (
    <View className='flex-1 gap-6'>
      <BackButton />

      <Slot />
    </View>
  );
}
