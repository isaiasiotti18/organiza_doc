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
        <NewCategory>
          <Button
            variant="outline"
            className="flex h-full w-full cursor-pointer justify-center gap-2.5 rounded-none border-0 p-4 text-center"
          >
            <PlusIcon size={24} />
            <span className="font-bold">Nova categoria</span>
          </Button>
        </NewCategory>
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
