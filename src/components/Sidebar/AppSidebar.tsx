import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavLink, useParams } from "react-router-dom";
import { NewCategory } from "../NewCategory";
import { Button } from "../ui/button";
import { SidebarFooterContent } from "./SidebarFooterContent";

import { categories } from "../../interfaces/CategoryInterface";
import { PlusIcon } from "@phosphor-icons/react";

export function AppSidebar() {
  const { category: categoryParam } = useParams<{ category: string }>();

  console.log(categoryParam);

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
        <SidebarGroup />
        <SidebarGroupLabel>Categorias de Documentos</SidebarGroupLabel>
        <SidebarMenu>
          {categories.map((category) => (
            <SidebarMenuItem key={category.title}>
              <NavLink to={category.url}>
                {({ isActive }) => (
                  <SidebarMenuButton isActive={isActive}>
                    <category.icon size={32} />
                    <span className="text-lg">{category.title}</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterContent />
      </SidebarFooter>
    </Sidebar>
  );
}
