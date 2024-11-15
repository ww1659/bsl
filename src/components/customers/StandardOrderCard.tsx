import { useState } from "react";

type StandardOrderCard = {
  customerId: string | null;
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { toTitleCase } from "@/lib/utils";
import { useFetchStandardOrders } from "@/hooks/fetch/useFetchStandardOrder";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderItem } from "@/types";
import { useToast } from "@/hooks/use-toast";
import AddItemsDropdown from "../orders/AddItemsDropdown";
import { useUpdateStandardOrder } from "@/hooks/update/useUpdateStandardOrder";
import { Spinner } from "../ui/loading";
import NewStandardOrderForm from "./NewStandardOrderForm";

function StandardOrderCard({ customerId }: StandardOrderCard) {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [orderName, setOrderName] = useState<string | null>("");
  const [selectedOrderItems, setSelectedOrderItems] = useState<OrderItem[]>([]);
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined);
  const [isNewOrder, setIsNewOrder] = useState<boolean>(false);

  const updateStandardOrder = useUpdateStandardOrder();

  const { data, isLoading, isError, error } = useFetchStandardOrders(
    customerId || ""
  );

  const handleSelectChange = (value: number | undefined) => {
    setSelectValue(value?.toString());
    setSelectedOrder(value ?? null);
    const selectedOrderData = data?.find((order) => order.id === value);
    const sortedItems = selectedOrderData?.order_items
      .filter((item): item is OrderItem => item.id !== undefined)
      .sort((a, b) => {
        const nameA = a.item_name?.toLowerCase();
        const nameB = b.item_name?.toLowerCase();
        if (nameA && nameB && nameA < nameB) return -1;
        if (nameA && nameB && nameA > nameB) return 1;
        return 0;
      });
    const orderName = selectedOrderData?.order_name;
    setOrderName(orderName || null);
    setSelectedOrderItems(sortedItems || []);
    setIsNewOrder(false);
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    setSelectedOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + quantity) }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId: number) => () => {
    const itemToRemove = selectedOrderItems.find((item) => item.id === itemId);
    setSelectedOrderItems((prevItems) =>
      prevItems.filter((prevItem) => prevItem.id !== itemId)
    );
    toast({
      title: `Removed ${toTitleCase(itemToRemove?.item_name || "")}`,
      description: `From Order: ${toTitleCase(orderName || "")}`,
      duration: 2000,
    });
  };

  const handleUpdateOrder = () => {
    updateStandardOrder.mutate(
      {
        orderId: selectedOrder || 0,
        orderItems: selectedOrderItems,
      },
      {
        onSuccess: () => {
          toast({
            title: "Order Updated",
            description: `Order "${toTitleCase(
              orderName || ""
            )}" updated successfully`,
            duration: 5000,
          });
          setSelectValue("");
          setSelectedOrder(null);
          setSelectedOrderItems([]);
          setOrderName(null);
        },
        onError: (error) => {
          console.log("ORDER UPDATED", error);
          toast({
            title: "Error",
            description: "Failed to update order",
          });
        },
      }
    );
  };

  const handleNewStandardOrder = () => {
    console.log("New Standard Order");
    setSelectValue("");
    setSelectedOrder(null);
    setSelectedOrderItems([]);
    setOrderName(null);
    setIsNewOrder(true);
  };

  const handleSaveNewOrder = () => {
    setIsNewOrder(false);
    setSelectValue("");
    setSelectedOrder(null);
    setSelectedOrderItems([]);
    setOrderName(null);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <Card className="flex flex-col justify-between">
        <div>
          <CardHeader className="flex flex-row justify-between gap-4">
            <div>
              <CardTitle>Standard Orders</CardTitle>
              <CardDescription>Update standard orders here</CardDescription>
            </div>
            <div className="flex flex-row gap-2">
              <Select
                value={selectValue}
                onValueChange={(value) => handleSelectChange(Number(value))}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Order" />
                </SelectTrigger>
                <SelectContent>
                  {data.map((order) => (
                    <SelectItem key={order.id} value={order.id.toString()}>
                      {toTitleCase(order.order_name || "")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleNewStandardOrder}>
                <div className="flex flex-row items-center gap-1">
                  <Plus className="w-4 h-4" />
                  <p>New</p>
                </div>
              </Button>
            </div>
          </CardHeader>
          {selectedOrder && (
            <CardContent className="border border-primary rounded-lg p-2 mx-4 mb-4">
              <div className="flex flex-row justify-between items-center px-2">
                {orderName && (
                  <p className="font-bold w-1/2">
                    Order: {toTitleCase(orderName)}
                  </p>
                )}
                <div className="w-1/4">
                  <AddItemsDropdown
                    currentOrderItems={selectedOrderItems}
                    setCurrentOrderItems={setSelectedOrderItems}
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="text-normal">
                    <TableHead>Item Name</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs md:text-sm">
                  {selectedOrderItems?.map((item) => (
                    <TableRow key={item.id} className="hover:bg-0">
                      <TableCell className="font-medium py-0">
                        {toTitleCase(item.item_name || "")}
                      </TableCell>
                      <TableCell className="py-0 text-center">
                        <div>
                          <span className="pr-2"> {item.quantity}</span>
                          <Button
                            variant="outline"
                            size="xs"
                            className="mr-1"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            -
                          </Button>
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="py-0 text-right">
                        <Button
                          variant="ghost"
                          onClick={handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex flex-row justify-end my-2">
                <Button
                  variant="outline"
                  onClick={handleUpdateOrder}
                  disabled={updateStandardOrder.isPending}
                >
                  {updateStandardOrder.isPending ? (
                    <Spinner size="sm" />
                  ) : (
                    "Save Changes"
                  )}{" "}
                </Button>
              </div>
            </CardContent>
          )}
          {isNewOrder && (
            <CardContent className="border border-primary rounded-lg p-4 mx-4 mb-4">
              <NewStandardOrderForm
                customerId={customerId || ""}
                handleSaveNewOrder={handleSaveNewOrder}
              />
            </CardContent>
          )}
        </div>
      </Card>
    );
}

export default StandardOrderCard;
