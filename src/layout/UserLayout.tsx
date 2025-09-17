import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

export function UserLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header displayFormInHeader={false} homeIcon={true} />
      <div className="mt-6 mb-10 flex items-center justify-center p-4">
        <Outlet />
      </div>
    </div>
  );
}
