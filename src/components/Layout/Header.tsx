import React from "react";
import { Link } from "react-router-dom";

import {
  AlignStartVertical,
  List,
  Origami,
  PanelLeft,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { supabase } from "@/services/supabase";

export const Header: React.FC = () => {
  // const session: Session | null = useAppSelector((state) => state.auth.session);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:static md:h-auto md:border-0 md:bg-transparent md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="md:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs gap-2">
          <div className="flex flex-col gap-2">
            <SheetHeader className="text-left">
              <SheetTitle>Black Swan Linen</SheetTitle>
            </SheetHeader>
            <SheetDescription aria-description="Navigation bar" />
            <nav className="grid gap-6 text-lg font-medium">
              <SheetClose asChild>
                <Link
                  to="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Origami className="h-5 w-5" />
                  Home
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  to="/customers"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/orders"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/picking-list"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <List className="h-5 w-5" />
                  Picking List
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/inventory"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <AlignStartVertical className="h-5 w-5" />
                  Inventory
                </Link>
              </SheetClose>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div> */}
      <div className="block ml-auto md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <img
                src="/placeholder-user.jpg"
                width="36"
                height="36"
                alt="CW"
                className="overflow-hidden rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
