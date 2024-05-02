import { Button, Card, Skeleton } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { PlaceholderCartItem } from './PlaceholderCartItem.tsx'

export const EmptyCart = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-full z-50 halftone" />
      <div className="absolute w-full h-full z-50 space-y-8 flex flex-col items-center justify-center">
        <p className="text-3xl font-bold text-center">
          Your cart is empty. <br />
          Go to the store page to buy our goods.
        </p>
        <Button color="primary" as={Link} to="/">
          To the store page
        </Button>
      </div>
      <div className="flex space-x-6">
        <div className="grow w-6/12">
          <div className="flex flex-col space-y-6 [&>*:nth-child(odd)]:hidden md:[&>*:nth-child(odd)]:flex">
            {Array(4)
              .fill(null)
              .map((_value, index) => (
                <PlaceholderCartItem key={index} />
              ))}
          </div>
        </div>
        <div className="w-4/12">
          <Card className="space-y-5 p-4 border" shadow="none">
            <Skeleton className="rounded-lg" disableAnimation>
              <div className="h-14 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="rounded-lg" disableAnimation>
              <div className="h-14 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="rounded-lg" disableAnimation>
              <div className="h-14 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="rounded-lg" disableAnimation>
              <div className="h-14 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="rounded-lg" disableAnimation>
              <div className="h-12 rounded-lg bg-default-400"></div>
            </Skeleton>
          </Card>
        </div>
      </div>
    </div>
  )
}
