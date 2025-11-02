import { Outlet } from "react-router-dom";
import { Header } from "./partials/Header";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { useAuth } from "@/context/auth-provider";
import { useNotificationsRealtime } from "@/hooks/notifications/use-notifications-realtime";

export function DefaultLayout() {
  const { user } = useAuth();
  useNotificationsRealtime(user?.id);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header displayFormInHeader={true}>
          <SidebarTrigger />
        </Header>
        <div className="mt-2 mb-2 flex items-center justify-center p-2">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
