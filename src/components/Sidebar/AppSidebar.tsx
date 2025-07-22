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
  SidebarSeparator,
} from "@/components/ui/sidebar"

import { AddressBook, CreditCard, Files, Plus, Receipt, } from 'phosphor-react'

import { NavLink } from "react-router-dom"

const categories = [
  {
    title: 'Contratos',
    url: 'contratos',
    icon: AddressBook
  },
  {
    title: 'Faturas',
    url: 'faturas',
    icon: CreditCard
  },
  {
    title: 'Boletos',
    url: 'boletos',
    icon: Receipt
  },
  {
    title: 'Documentos',
    url: 'documentos',
    icon: Files
  }  
]

export function AppSidebar() {
  return (
    <Sidebar >
      <SidebarHeader className="h-14 p-0 m-0">
      <button className="w-full h-full flex justify-center text-center p-4 gap-2.5 cursor-pointer">
        <Plus size={24} />
        <span className="font-bold">Nova categoria</span>
      </button>
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
      <SidebarFooter />
    </Sidebar>
  )
}