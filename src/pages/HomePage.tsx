import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function HomePage() {
  return (
    <div className="grid gap-10">
      <div className="grid gap-4">
        <div className="flex flex-row items-center  gap-4">
          <h1>Welcome to BSL</h1>
          <Badge>Beta</Badge>
        </div>
        <p>
          Welcome to the Black Swan Linen Sales Interface. This is your central
          platform for managing your linen rental business. Get started by
          selecting an option below or using the navigation pane on the left.
        </p>
      </div>
      <div className="grid gap-4">
        <h2>What would you like to do?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <Link to="customers">
            <Card className="hover:bg-accent h-full">
              <CardHeader>
                <CardTitle>Manage Customers</CardTitle>
                <CardDescription>
                  View, update and manage customers
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="picking-list">
            <Card className="hover:bg-accent h-full">
              <CardHeader>
                <CardTitle>View Picking List</CardTitle>
                <CardDescription>
                  Use the picking list to prepare your linen items
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="inventory">
            <Card className="hover:bg-accent h-full">
              <CardHeader>
                <CardTitle>Check Inventory</CardTitle>
                <CardDescription>
                  Manage your items and check the current inventory
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="orders/create">
            <Card className="hover:bg-accent h-full">
              <CardHeader>
                <CardTitle>Create a New Order</CardTitle>
                <CardDescription>
                  Build a new order for a customer
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
