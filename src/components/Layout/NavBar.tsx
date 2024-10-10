import React from "react";

import { Home, LineChart, Settings, ShoppingCart, Users2 } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOutButton";

export const NavBar: React.FC = () => {
  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Home</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/customers"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Customers</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/orders"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <ShoppingCart className="h-5 w-5" />{" "}
                <span className="sr-only">Orders</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Orders</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/invoices"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Invoices</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Invoices</TooltipContent>
          </Tooltip>
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <SignOutButton />
          <DarkModeToggle />
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
};
