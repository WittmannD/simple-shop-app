import {Card, Skeleton} from "@nextui-org/react";

export const PlaceholderCartItem = () => {
  return (
    <Card shadow="none" className="border">
      <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
        <Skeleton
          className="rounded-lg col-span-4 h-24"
          disableAnimation
        />
        <div className="flex col-span-6">
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