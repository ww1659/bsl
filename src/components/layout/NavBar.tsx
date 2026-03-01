import { Session } from '@supabase/supabase-js'
import {
  AlignStartVertical,
  List,
  Origami,
  ShoppingCart,
  UserCircle2,
  Users2,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAppSelector } from '@/redux/hooks'
import { supabase } from '@/services/supabase'

import { DarkModeToggle } from '../DarkModeToggle'

export const NavBar: React.FC = () => {
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
    }
  }

  const session: Session | null = useAppSelector((state) => state.auth.session)
  const userEmail = session?.user.email

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-40 flex-col border-r bg-background md:flex">
      <nav className="flex flex-col items-start px-2 sm:py-5">
        <Link
          to="/"
          className="flex flex-row w-full p-3 my-1 text-muted-foreground hover:text-primary hover:font-medium hover:bg-accent"
        >
          <div className="flex flex-row w-full gap-2">
            <Origami className="h-5 w-5" />
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

        {/* <Link
          to="/invoices"
          className="flex flex-row w-full p-3 my-1 text-muted-foreground hover:text-primary hover:font-medium hover:bg-accent"
        >
          <div className="flex flex-row w-full gap-2">
            <LineChart className="h-5 w-5" />
            <p className="text-sm overflow-hidden whitespace-nowrap">
              Invoices
            </p>
          </div>
        </Link> */}

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

        <Link
          to="/inventory"
          className="flex flex-row w-full p-3 my-1 text-muted-foreground hover:text-primary hover:font-medium hover:bg-accent"
        >
          <div className="flex flex-row w-full gap-2">
            <AlignStartVertical className="h-5 w-5" />
            <p className="text-sm overflow-hidden whitespace-nowrap">
              Inventory
            </p>
          </div>
        </Link>
      </nav>

      <nav className="mt-auto flex flex-col items-start px-3 gap-4 sm:py-5">
        {/* <Link
          to="/"
          className="flex flex-row w-full p-3 my-1 text-muted-foreground hover:text-primary hover:font-medium hover:bg-accent"
        >
          <div className="flex flex-row w-full gap-2">
            <Settings className="h-5 w-5" />
            <p className="text-sm overflow-hidden whitespace-nowrap">
              Settings
            </p>
          </div>
        </Link> */}
        <div className="flex flex-row w-full items-center gap-2">
          <DarkModeToggle />
          <p className="text-sm overflow-hidden whitespace-nowrap text-muted-foreground">
            Dark Mode
          </p>
        </div>

        <DropdownMenu>
          <div className="flex flex-row w-full items-center gap-2">
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="" />
                <AvatarFallback>
                  <UserCircle2 />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <p className="text-sm overflow-hidden whitespace-nowrap text-muted-foreground">
              Account
            </p>
          </div>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <p>My Account</p>
                <p className="text-xs font-normal">{userEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </aside>
  )
}
