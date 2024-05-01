import { CartItem } from './CartItem.tsx'
import { useAppSelector } from '../../hooks/useAppState.ts'
import {
  selectCartItems,
  selectCartItemsTotalPrice,
} from '../../app/features/cart/cart.selectors.ts'
import { Currency } from '../misc/Currency.tsx'
import { Chip } from '@nextui-org/react'

export const CartItemList = () => {
  const totalPrice = useAppSelector(selectCartItemsTotalPrice)
  const items = useAppSelector(selectCartItems)

  return (
    <div>
      <div className="flex flex-col space-y-6">
        {items.slice(0, 6).map((item) => {
          return (
            <CartItem
              data={item.data}
              quantity={item.quantity}
              key={item.data.id}
            />
          )
        })}
      </div>
      <div className="py-12 sticky bottom-0 bg-white z-50">
        <div className="text-lg text-right flex items-center justify-end space-x-4">
          <span>Total: </span>
          <Currency as={Chip} size="lg">
            {totalPrice}
          </Currency>
        </div>
      </div>
    </div>
  )
}
