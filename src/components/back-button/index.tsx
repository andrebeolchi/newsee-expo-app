import { useRouter } from 'expo-router'
import { LucideMoveLeft } from 'lucide-react-native'
import React from 'react'
import { Pressable } from 'react-native'

import { Text } from '~/components/ui/text'

export const BackButton = () => {
  const router = useRouter()

  return (
    <Pressable
      className='flex-row items-center gap-3 group/back'
      onPress={() => router.back()}
    >
      <LucideMoveLeft size={16} />
      <Text className='group-active/back:underline'>
        Voltar
      </Text>
    </Pressable>
  )
}