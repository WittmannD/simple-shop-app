import {Card, Skeleton} from "@nextui-org/react";

export const PlaceholderCartItem = () => {
  return (
    <Card shadow="none" className="border">
      <div className="grid grid-cols-1 gap-y-4 gap-x-0 md:gap-x-4 md:grid-cols-12 items-center justify-center">
        <Skeleton
          className="rounded-lg col-span-6 row-span-1 md:row-span-1 h-24"
          disableAnimation
        />
        <div className="flex col-span-4 row-span-2 md:row-span-1">
          <div className="space-y-3 w-full">
            <Skeleton className="w-3/5 rounded-lg" disableAnimation>
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg" disableAnimation>
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg" disableAnimation>
              <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
            </Skeleton>
          </div>
        </div>
      </div>
    </Card>
  )
}