import { Outlet } from "react-router-dom";
import { Header } from "../components/Header"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";

export function DefaultLayout() {
  return(
    <SidebarProvider>
      <AppSidebar/>
        <SidebarInset>
          <Header displayFormInHeader={true}>
            <SidebarTrigger />
          </Header>
          <div className="flex items-center justify-center pl-1.5 mt-2 mb-2">       
            <Outlet />
          </div>
        </SidebarInset>
    </SidebarProvider>
  )
}