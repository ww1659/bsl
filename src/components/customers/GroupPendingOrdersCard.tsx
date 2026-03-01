import { format } from 'date-fns'
import { useMemo } from 'react'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useFetchOrders } from '@/hooks/order/useFetchOrders'
import { toTitleCase } from '@/lib/utils'
import { useAppSelector } from '@/redux/hooks'

function GroupPendingOrdersCard() {
  const groupId = useAppSelector((state) => state.group.groupId)

  const { data, isLoading, isError, error } = useFetchOrders({
    groupId: groupId ?? undefined,
  })

  const sortedData = useMemo(
    () =>
      data
        ?.sort((a, b) => {
          // Defensive sort to ensure delivery date ordering
          const dateA = a.deliveryDate ? new Date(a.deliveryDate).getTime() : 0
          const dateB = b.deliveryDate ? new Date(b.deliveryDate).getTime() : 0
          return dateA - dateB
        })
        .slice(0, 3),
    [data]
  )

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <Card className="grid gap-1 col-span-1 sm:col-span-2 xl:col-span-1">
      <CardHeader>
        <CardTitle>Pending Orders</CardTitle>
      </CardHeader>
      {sortedData && sortedData.length > 0 ? (
        sortedData.map((order) => (
          <CardContent className="grid gap-2 p-0" key={order.id}>
            <Card className="rounded-lg mx-2 hover:bg-accent hover:cursor-pointer">
              <CardContent className="px-4 py-2 flex flex-row gap-4">
                <p className="font-bold">#{order.number}</p>
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground">
                    Delivery Date:{' '}
                    <span className="font-bold text-primary">
                      {format(
                        new Date(order.deliveryDate ?? new Date()),
                        'MMM d, yyyy'
                      )}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Customer:{' '}
                    <span className="font-bold text-primary">
                      {toTitleCase(order.customerName || '')}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        ))
      ) : (
        <div className="flex justify-center items-center">
          <p>No pending orders</p>
        </div>
      )}
      <CardFooter />
    </Card>
  )
}

export default GroupPendingOrdersCard
