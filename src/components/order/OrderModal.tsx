import {
  Button,
  Image,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { OrderType } from '../../app/api/types/order.type.ts'
import { Currency } from '../misc/Currency.tsx'
import {useMemo} from "react";

export interface OrderModalProps {
  order: OrderType
}

export const OrderModal = (props: OrderModalProps) => {
  const bottomContent = useMemo(() => (
    <div className="text-right">
      <p className="space-y-2"><span>{props.order.total.quantity}</span><span> items</span></p>
      <p className="space-y-2"><span>Total price: </span><Currency>{props.order.total.cost}</Currency></p>
    </div>
  ), [props.order])

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">
            Order in process! Thank you for your purchase!
          </ModalHeader>
          <ModalBody>
            <div className="p-4">
              <p className="flex justify-between gap-4">
                <span className="w-1/2">First Name</span>
                <span className="w-1/2">
                  {props.order.information.firstName}
                </span>
              </p>
              <p className="flex justify-between gap-4">
                <span className="w-1/2">Last Name</span>
                <span className="w-1/2">
                  {props.order.information.lastName}
                </span>
              </p>
              <p className="flex justify-between gap-4">
                <span className="w-1/2">Address</span>
                <span className="w-1/2">{props.order.information.address}</span>
              </p>
              <p className="flex justify-between gap-4">
                <span className="w-1/2">Phone Number</span>
                <span className="w-1/2">
                  {props.order.information.phoneNumber}
                </span>
              </p>
              <p className="mt-4 text-sm">Order ID: {props.order.id}</p>
            </div>
            <Table
              removeWrapper
              aria-label="Example static collection table"
              bottomContent={bottomContent}
            >
              <TableHeader>
                <TableColumn width="25%">preview</TableColumn>
                <TableColumn width="40%">product</TableColumn>
                <TableColumn width="20%">price</TableColumn>
                <TableColumn width="15%">quantity</TableColumn>
              </TableHeader>
              <TableBody>
                {props.order.items.map((item) => (
                  <TableRow key={item.product.id}>
                    <TableCell>
                      <Image
                        alt={item.product.title}
                        src={item.product.image}
                        isBlurred={false}
                        isLoading={false}
                      />
                    </TableCell>
                    <TableCell>{item.product.title}</TableCell>
                    <TableCell>
                      <Currency>{item.product.price}</Currency>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  )
}
