import { useAppSelector } from './useAppState.ts'
import { useMemo } from 'react'

export const useSelectCartItems = () => {
  const { items, loading } = useAppSelector((state) => state.cart)

  const isLoading = useMemo(() => loading === 'pending', [loading])
  const isSucceed = useMemo(() => loading === 'succeeded', [loading])
  const isError = useMemo(() => loading === 'failed', [loading])

  return { items, isLoading, isSucceed, isError }
}
