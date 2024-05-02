import { useAppSelector } from './useAppState.ts'
import { useMemo } from 'react'

export const useSelectOrder = () => {
  const { order, loading } = useAppSelector((state) => state.order)

  const isLoading = useMemo(() => loading === 'pending', [loading])
  const isSucceed = useMemo(() => loading === 'succeeded', [loading])
  const isError = useMemo(() => loading === 'failed', [loading])

  return { order, isLoading, isSucceed, isError }
}
