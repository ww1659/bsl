import { OrderItem } from "@/types";

type CreateOrderCard = {
  customerId: string | null;
  customerName: string | null;
  currentOrderItems: OrderItem[];
  setCurrentOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  customerDiscount: number | null;
};

//utils
import { toTitleCase } from "@/lib/utils";

//supabase hooks
import { useFetchStandardOrder } from "@/hooks/useFetchStandardOrder";

//ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, PlusIcon, Trash2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";
import AddItemsDropdown from "./AddItemsDropdown";
import { Input } from "../ui/input";

function CreateOrderCard({
  customerId,
  customerName,
  currentOrderItems,
  setCurrentOrderItems,
  customerDiscount,
}: CreateOrderCard) {
  const { data, isLoading, isError, error } = useFetchStandardOrder(
    customerId || ""
  );

  console.log(data);

  const handleOrderChange = (selectedOrderName: string) => {
    const selectedOrderItems =
      data?.standard_order?.find(
        (order) => order.order_name === selectedOrderName
      )?.standard_order_items || [];
    setCurrentOrderItems(selectedOrderItems);
  };

  const removeItem = (itemId: number) => {
    setCurrentOrderItems((prevItems) =>
      prevItems.filter((item) => item.items?.id !== itemId)
    );
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    setCurrentOrderItems((prevItems) =>
      prevItems.map((orderItem) =>
        orderItem.items?.id === itemId
          ? { ...orderItem, quantity: newQuantity > 0 ? newQuantity : 1 } // Ensure minimum quantity of 1
          : orderItem
      )
    );
  };

  const standardOrderNames =
    data?.standard_order?.map((order) => order.order_name) || [];

  const sortedItems = currentOrderItems.sort((a, b) => {
    const nameA = a.items?.item_name?.toLowerCase();
    const nameB = b.items?.item_name?.toLowerCase();
    if (nameA && nameB && nameA < nameB) return -1;
    if (nameA && nameB && nameA > nameB) return 1;
    return 0;
  });

  const orderTotal =
    currentOrderItems.reduce((total, item) => {
      const itemPrice = item.items?.price || 0;
      const quantity = item.quantity;

      return total + itemPrice * quantity;
    }, 0) *
    ((100 - (customerDiscount || 0)) / 100);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <div>
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader>
              <div className="flex flex-row justify-between items-center">
                <div className="w-1/2">
                  <CardTitle>Item List</CardTitle>
                  <CardDescription className="font-bold">
                    {toTitleCase(customerName || "")}
                  </CardDescription>
                </div>
                <div className="w-1/2">
                  <div className="flex flex-row gap-2">
                    <Select onValueChange={handleOrderChange}>
                      <SelectTrigger className="rounded-md">
                        <SelectValue placeholder="Select a standard order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            {toTitleCase(customerName || "")} Standard Orders
                          </SelectLabel>
                          {standardOrderNames.map((name, index) => (
                            <SelectItem key={index} value={name || "default"}>
                              {toTitleCase(name || "default")}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <AddItemsDropdown
                      currentOrderItems={currentOrderItems}
                      setCurrentOrderItems={setCurrentOrderItems}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {sortedItems.length !== 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="text-xs md:text-md">
                      <TableHead>Item Name</TableHead>
                      <TableHead>
                        <div className="flex flex-col">
                          <span>Customer Price (£)</span>
                          <span className="text-xs font-light">
                            {customerDiscount}% discount
                          </span>
                        </div>
                      </TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Amount (£)</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs md:text-sm">
                    {sortedItems?.map((item) => (
                      <TableRow key={item.items?.id}>
                        <TableCell className="font-medium py-1">
                          {toTitleCase(item.items?.item_name || "")}
                        </TableCell>
                        <TableCell className="py-1">
                          {customerDiscount
                            ? (
                                Number(item.items?.price) *
                                ((100 - customerDiscount) / 100)
                              ).toFixed(2)
                            : item.items?.price?.toFixed(2)}
                        </TableCell>
                        <TableCell className="py-1 flex flex-row gap-1 items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10"
                            onClick={() =>
                              updateQuantity(
                                item.items?.id || 0,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <Input
                            type="text"
                            className="w-1/5 py-0 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.items?.id || 0,
                                Number(e.target.value)
                              )
                            }
                            min={1}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10"
                            onClick={() =>
                              updateQuantity(
                                item.items?.id || 0,
                                item.quantity + 1
                              )
                            }
                          >
                            +
                          </Button>
                        </TableCell>
                        <TableCell className="py-1 text-right">
                          {item.items?.price
                            ? (item.quantity * item.items?.price).toFixed(2)
                            : ""}
                        </TableCell>
                        <TableCell className="py-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => removeItem(item.items?.id || 0)}
                              >
                                Remove Item
                                <Trash2Icon className="h-4 w-4 ml-1" />
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">
                        £{orderTotal.toFixed(2)}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              ) : (
                <div className="flex justify-center align-center">
                  <p className="text-sm">
                    No items in order. Please select a standard order or add a
                    new item
                  </p>
                </div>
              )}
            </CardContent>
          </div>
        </Card>
      </div>
    );
}

export default CreateOrderCard;
