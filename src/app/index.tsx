import { Redirect } from 'expo-router'
import React from 'react'
import { useMMKVObject } from 'react-native-mmkv'

import LoginScreen from './(anon)/login'

export default function GeneralLayout() {
  const [user] = useMMKVObject('user')

  if (!user) {
    return <LoginScreen />
  }
  
  return <Redirect href='/posts' />
}
