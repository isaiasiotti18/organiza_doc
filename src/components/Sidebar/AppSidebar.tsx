import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { NewCategory } from "../NewCategory";
import { Button } from "../ui/button";
import { SidebarFooterContent } from "./SidebarFooterContent";

import { PlusIcon } from "@phosphor-icons/react";
import { DocumentCategories } from "./DocumentCategories";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="m-0 h-15 p-0">
        <NewCategory />
      </SidebarHeader>
      <SidebarContent>
        <DocumentCategories />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterContent />
      </SidebarFooter>
    </Sidebar>
  );
}
