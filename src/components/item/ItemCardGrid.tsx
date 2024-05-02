import { useCallback, useEffect, useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ItemCard } from './ItemCard.tsx'
import { useAppDispatch } from '../../hooks/useAppState.ts'
import { fetchAllProducts } from '../../app/features/products/products.thunk.ts'
import { PlaceholderItemCard } from './PlaceholderItemCard.tsx'
import { useSelectProducts } from '../../hooks/useSelectProducts.ts'

export const ItemCardGrid = () => {
  const dispatch = useAppDispatch()
  const { items: products, pagination, isLoading } = useSelectProducts()
  useEffect(() => {
    if (products.length === 0 && !isLoading)
      dispatch(fetchAllProducts({ limit: 24 }))
  }, [])

  const fetchMore = useCallback(() => {
    if (!isLoading)
      dispatch(fetchAllProducts({ limit: 24 }))
  }, [dispatch, pagination.cursor?.id])

  const hasMore = useMemo(
    () => !pagination.empty,
    [products, pagination]
  )

  return (
    <div className="container mx-auto">
      <InfiniteScroll
        className="gap-6 grid grid-cols-3 sm:grid-cols-4"
        dataLength={products.length}
        next={fetchMore}
        hasMore={hasMore} // Replace with a condition based on your data source
        loader={<PlaceholderItemCard />}
        endMessage={<p>No more data to load.</p>}
      >
        {products.map((item) => {
          return <ItemCard data={item} key={item.id} />
        })}
      </InfiniteScroll>
    </div>
  )
}
