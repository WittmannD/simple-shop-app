import {Button, Card, CardBody, Image, Input} from "@nextui-org/react";
import {MinusIcon} from "../icons/MinusIcon.tsx";
import {PlusIcon} from "../icons/PlusIcon.tsx";
import {FormEvent, useCallback} from "react";
import {useAppDispatch} from "../../hooks/useAppState.ts";
import {ProductType} from "../../app/api/types/product.type.ts";
import {addItem, removeItem, setItemQuantity} from "../../app/features/cart/cart.thunk.ts";


export interface CartCardProps {
  data: ProductType;
  quantity: number;
}


export const CartItem = (props: CartCardProps) => {
  const dispatch = useAppDispatch()

  const addQuantity = useCallback(() => {
    dispatch(addItem({ productId: props.data.id }))
  }, [props.data])

  const subQuantity = useCallback(() => {
    dispatch(removeItem({ productId: props.data.id }))
  }, [props.data])

  const setQuantity = useCallback((event: FormEvent<HTMLInputElement>) => {
    dispatch(setItemQuantity({ productId: props.data.id, quantity: Number(event.currentTarget.value) }))
  }, [props.data])

  return (
    <Card
      className="border-1 bg-background/60 dark:bg-default-100/50"
      shadow="none"
      fullWidth={true}
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-4">
            <Image
              alt={props.data.title}
              className="object-cover"
              shadow="md"
              src={props.data.image}
              width="100%"
            />
          </div>

          <div className="flex col-span-6">
            <div>
              <b>{props.data.title}</b>
              <p className="text-default-500">{props.data.description}</p>
            </div>
          </div>
          <div className="flex items-center col-span-2 gap-2">
            <Button isIconOnly aria-label="less" onClick={subQuantity}>
              <MinusIcon/>
            </Button>
            <Input
              type="number"
              min={0}
              variant="bordered"
              classNames={{mainWrapper: "min-w-10", input: "hide-controls"}}
              onChange={setQuantity}
              value={String(props.quantity)}
            />
            <Button isIconOnly aria-label="more" onClick={addQuantity}>
              <PlusIcon/>
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}