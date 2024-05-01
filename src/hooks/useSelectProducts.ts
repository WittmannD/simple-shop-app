import { useAppSelector } from './useAppState.ts'
import { useMemo } from 'react'

export const useSelectProducts = () => {
  const { items, pagination, loading } = useAppSelector((state) => state.products)

  const isLoading = useMemo(() => loading === 'pending', [loading])
  const isSucceed = useMemo(() => loading === 'succeeded', [loading])
  const isError = useMemo(() => loading === 'failed', [loading])

  return { items, pagination, isLoading, isSucceed, isError }
}
