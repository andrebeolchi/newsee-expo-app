import { Redirect } from 'expo-router'
import React, { useEffect } from 'react'
import { useMMKVObject } from 'react-native-mmkv'

import { setAuthorizationHeader } from '~/interfaces/sdk'
import LoginScreen from './(auth)/login'

export default function GeneralLayout() {
  const [user] = useMMKVObject('user')

  useEffect(() => {
    user?.token && setAuthorizationHeader(user?.token);
  }, []);

  if (!user) {
    return <LoginScreen />
  }

  return <Redirect href='/posts' />
}
