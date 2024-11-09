import React from "react";

import {
  Home,
  LineChart,
  List,
  Origami,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Link } from "react-router-dom";

export const NavBar: React.FC = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-40 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-start px-2 sm:py-5">
        <Link
          to="/"
          className="flex flex-row w-full px-3 py-1 my-1 font-medium"
        >
          <div className="flex flex-row w-full gap-2 justify-start">
            <Origami />
            <p className="text-lg overflow-hidden whitespace-nowrap">BSL</p>
          </div>
        </Link>

        <Link
          to="/"
          className="flex flex-row w-full p-3 my-1 text-muted-foreground hover:text-primary hover:font-medium hover:bg-accent"
        >
          <div className="flex flex-row w-full gap-2">
            <Home className="h-5 w-5" />
            <p className="text-sm overflow-hidden whitespace-nowrap">Home</p>
          </div>
        </Link>

        <Link
          to="/customers"
          className="flex flex-row w-full p-3 my-1 text-muted-foreground hover:text-primary hover:font-medium hover:bg-accent"
        >
          <div className="flex flex-row w-full gap-2">
            <Users2 className="h-5 w-5" />
            <p className="text-sm overflow-hidden whitespace-nowrap">
              Customers
            </p>
          </div>
        </Link>

        <Link
          to="/orders"
          className="flex flex-row w-full p-3 my-1 text-muted-foreground hover:text-primary hover:font-medium hover:bg-accent"
        >
          <div className="flex flex-row w-full gap-2">
            <ShoppingCart className="h-5 w-5" />
            <p className="text-sm overflow-hidden whitespace-nowrap">Orders</p>
          </div>
        </Link>

        <Link
          to="/invoices"
          className="flex flex-row w-full p-3 my-1 text-muted-foreground hover:text-primary hover:font-medium hover:bg-accent"
        >
          <div className="flex flex-row w-full gap-2">
            <LineChart className="h-5 w-5" />
            <p className="text-sm overflow-hidden whitespace-nowrap">
              Invoices
            </p>
          </div>
        </Link>

        <Link
          to="/picking-list"
          className="flex flex-row w-full p-3 my-1 text-muted-foreground hover:text-primary hover:font-medium hover:bg-accent"
        >
          <div className="flex flex-row w-full gap-2">
            <List className="h-5 w-5" />
            <p className="text-sm overflow-hidden whitespace-nowrap">
              Picking List
            </p>
          </div>
        </Link>
      </nav>

      <nav className="mt-auto flex flex-col items-start gap-4 px-0 sm:py-5">
        <Link
          to="/"
          className="flex flex-row w-full p-3 my-1 text-muted-foreground hover:text-primary hover:font-medium hover:bg-accent"
        >
          <div className="flex flex-row w-full gap-2">
            <Settings className="h-5 w-5" />
            <p className="text-sm overflow-hidden whitespace-nowrap">
              Settings
            </p>
          </div>
        </Link>
      </nav>
    </aside>
  );
};
