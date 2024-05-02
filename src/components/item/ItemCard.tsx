import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { CartIcon } from '../icons/CartIcon.tsx'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppState.ts'
import { useCallback } from 'react'
import { Currency } from '../misc/Currency.tsx'
import { selectIsProductInCart } from '../../app/features/cart/cart.selectors.ts'
import {PlusCircleIcon} from "../icons/PlusCircleIcon.tsx";
import {ProductType} from "../../app/api/types/product.type.ts";
import {addItem} from "../../app/features/cart/cart.thunk.ts";

export interface ItemCardProps {
  data: ProductType
}

export const ItemCard = (props: ItemCardProps) => {
  const dispatch = useAppDispatch()
  const productInCart = useAppSelector((state) =>
    selectIsProductInCart(state, props.data.id)
  )

  const addToCart = useCallback(async () => {
    dispatch(addItem({ productId: props.data.id }))
  }, [props.data])

  return (
    <Card shadow="none" className="border">
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={props.data.title}
          className="w-full object-cover h-[250px]"
          src={props.data.image}
        />
      </CardBody>
      <CardFooter className="text-small flex flex-col h-full">
        <div className="flex flex-col min-h-2 h-full space-y-3">
          <div className="space-y-2 mb-auto">
            <p className="font-bold text-lg">{props.data.title}</p>
            <p className="text-default-500">{props.data.description}</p>
          </div>
          <div>
            <Button
              fullWidth={true}
              color="primary"
              startContent={productInCart ? <PlusCircleIcon /> : <CartIcon />}
              onClick={addToCart}
            >
              <Currency className="font-extrabold">{props.data.price}</Currency>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
