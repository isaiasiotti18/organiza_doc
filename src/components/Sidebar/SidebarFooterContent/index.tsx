import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

import { UserIcon, CaretCircleUpIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function SidebarFooterContent() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-2 rounded px-4 py-2 text-left text-sm">
              <UserIcon size={24} /> Username
              <CaretCircleUpIcon size={24} className="ml-auto" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem>
              <Link to="/user/account">Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/user/billing">Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/register">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
