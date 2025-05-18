import React from 'react'

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

export const queryClient = new QueryClient()

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  if (!children) {
    throw new Error('QueryProvider must have children')
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}