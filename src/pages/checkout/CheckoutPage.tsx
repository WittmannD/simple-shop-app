import { Topbar } from '../../components/topbar/Topbar.tsx'
import { OrderForm } from '../../components/order/OrderForm.tsx'
import { CartItemList } from '../../components/cart/CartItemList.tsx'
import { useAppSelector } from '../../hooks/useAppState.ts'
import { selectCartItemsCount } from '../../app/features/cart/cart.selectors.ts'
import { EmptyCart } from '../../components/cart/EmptyCart.tsx'

export const CheckoutPage = () => {
  const cartItemsCount = useAppSelector(selectCartItemsCount)

  console.log(cartItemsCount)

  if (cartItemsCount === 0)
    return (
      <>
        <Topbar />
        <main>
          <div className="container mx-auto">
            <EmptyCart />
          </div>
        </main>
      </>
    )

  return (
    <>
      <Topbar />
      <main>
        <div className="container mx-auto">
          <div className="flex space-x-6 relative">
            <div className="grow w-6/12">
              <CartItemList />
            </div>
            <div className="w-4/12 sticky top-24 self-start">
              <OrderForm />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
