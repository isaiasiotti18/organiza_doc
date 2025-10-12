import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Skeleton } from "@/components/ui/skeleton";

import { NavLink } from "react-router-dom";

import { useCategories } from "@/hooks/get-categories";

export function DocumentCategories() {
  const { data: result, isLoading } = useCategories();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Categorias de Documentos</SidebarGroupLabel>
      <SidebarMenu>
        {isLoading ? (
          // Skeletons enquanto carrega
          Array.from({ length: 5 }).map((_, i) => (
            <SidebarMenuItem key={`skeleton-${i}`}>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-md" />
                <Skeleton className="h-5 w-32" />
              </div>
            </SidebarMenuItem>
          ))
        ) : (
          <>
            {result?.map((category) => (
              <SidebarMenuItem key={category.id}>
                <NavLink to={`/app/documents/${category.name}`}>
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
                      {/* <category.icon size={32} /> */}
                      <span className="text-lg">{category.name}</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))}

            <SidebarMenuItem key={"all"}>
              <NavLink to={`/app/documents/all`}>
                {({ isActive }) => (
                  <SidebarMenuButton isActive={isActive}>
                    {/* <category.icon size={32} /> */}
                    <span className="text-lg">Todos</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          </>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
