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
} from "@/components/ui/sidebar"

import { NavLink } from "react-router-dom"
import { NewCategory } from "../NewCategory"
import { Button } from "../ui/button"
import { SidebarFooterContent } from "./SidebarFooterContent"

import { categories } from "./SidebarFooterContent/CategoryInterface"
import { Plus } from "phosphor-react"

export function AppSidebar() {
  return (
    <Sidebar >
      <SidebarHeader className="h-15 p-0 m-0">
        <NewCategory>
          <Button variant="outline" className="border-0 rounded-none w-full h-full flex justify-center text-center p-4 gap-2.5 cursor-pointer">
            <Plus size={24} />
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
                <SidebarMenuButton asChild>
                  <NavLink to={category.url}>
                    <category.icon size={24}/>
                    <span>{category.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterContent />
      </SidebarFooter>
    </Sidebar>
  )
}