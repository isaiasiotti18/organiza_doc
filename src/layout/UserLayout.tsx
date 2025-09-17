import { Header } from "@/layout/partials/Header";
import { Outlet } from "react-router-dom";

export function UserLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header displayFormInHeader={false} homeIcon={true} />
      <div className="mt-2 flex items-center justify-center p-4">
        <Outlet />
      </div>
    </div>
  );
}
