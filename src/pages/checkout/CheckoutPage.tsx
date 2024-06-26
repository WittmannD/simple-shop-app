import { Topbar } from '../../components/topbar/Topbar.tsx'
import { OrderForm } from '../../components/order/OrderForm.tsx'
import { CartItemList } from '../../components/cart/CartItemList.tsx'
import { useAppSelector } from '../../hooks/useAppState.ts'
import { selectCartItemsCount } from '../../app/features/cart/cart.selectors.ts'
import { EmptyCart } from '../../components/cart/EmptyCart.tsx'
import { Modal, useDisclosure } from '@nextui-org/react'
import { OrderModal } from '../../components/order/OrderModal.tsx'
import { useSelectOrder } from '../../hooks/useSelectOrder.ts'

export const CheckoutPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { order, isLoading } = useSelectOrder()
  const cartItemsCount = useAppSelector(selectCartItemsCount)

  return (
    <>
      <Topbar />
      <main>
        <div className="container mx-auto">
          {cartItemsCount < 1 ? (
            <EmptyCart />
          ) : (
            <div className="flex flex-col-reverse lg:flex-row space-y-reverse space-y-6 lg:space-y-0 lg:space-x-6 relative">
              <div className="grow lg:w-6/12">
                <CartItemList />
              </div>
              <div className="w-full lg:w-4/12 lg:sticky lg:top-24 self-start">
                <OrderForm openModal={onOpen} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Modal
        isOpen={isOpen && !isLoading}
        onOpenChange={onOpenChange}
        size="2xl"
      >
        <OrderModal order={order!} />
      </Modal>
    </>
  )
}
