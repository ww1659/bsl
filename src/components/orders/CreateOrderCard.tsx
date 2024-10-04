type OrderItem = {
  quantity: number;
  items: {
    id: number;
    item_name: string | null;
    price: number | null;
  } | null;
};

type CreateOrderCard = {
  customerId: string | null;
  customerName: string | null;
  currentOrderItems: OrderItem[];
  setCurrentOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
};

import { useState } from "react";

//utils
import { toTitleCase } from "@/lib/utils";

//supabase hooks
import { useFetchStandardOrder } from "@/hooks/useFetchStandardOrder";

//ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { MoreHorizontal, Trash2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

function CreateOrderCard({
  customerId,
  customerName,
  currentOrderItems,
  setCurrentOrderItems,
}: CreateOrderCard) {
  const { data, isLoading, isError, error } = useFetchStandardOrder(
    customerId || ""
  );

  const handleOrderChange = (selectedOrderName: string) => {
    const selectedOrderItems =
      data?.standard_order?.find(
        (order) => order.order_name === selectedOrderName
      )?.order_items || [];
    setCurrentOrderItems(selectedOrderItems);
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

  const orderTotal = currentOrderItems.reduce((total, item) => {
    const itemPrice = item.items?.price || 0;
    const quantity = item.quantity;
    return total + itemPrice * quantity;
  }, 0);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <div>
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2 justify-between items-center">
                  <CardTitle>
                    Item List: {toTitleCase(customerName || "")}
                  </CardTitle>
                  <Select onValueChange={handleOrderChange}>
                    <SelectTrigger className="rounded-md">
                      <SelectValue placeholder="Select Order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {toTitleCase(customerName || "")}: Orders
                        </SelectLabel>
                        {standardOrderNames.map((name, index) => (
                          <SelectItem key={index} value={name || "default"}>
                            {toTitleCase(name || "default")}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Button size="icon">
                    <PlusIcon />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {sortedItems.length !== 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="text-xs md:text-sm">
                      <TableHead>Item Name</TableHead>
                      <TableHead>List Price (£)</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Amount (£)</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs md:text-sm">
                    {sortedItems?.map((item) => (
                      <TableRow key={item.items?.id}>
                        <TableCell className="font-medium py-2">
                          {toTitleCase(item.items?.item_name || "")}
                        </TableCell>
                        <TableCell className="py-2">
                          {item.items?.price?.toFixed(2)}
                        </TableCell>
                        <TableCell className="py-2">{item.quantity}</TableCell>
                        <TableCell className="py-2 text-right">
                          {item.items?.price
                            ? (item.quantity * item.items?.price).toFixed(2)
                            : ""}
                        </TableCell>
                        <TableCell>
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
                              <DropdownMenuItem>
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
