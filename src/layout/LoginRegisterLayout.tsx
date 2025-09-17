import { Outlet } from "react-router-dom";
import { Header } from "./partials/Header";

export function LoginRegisterLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header displayFormInHeader={false} />
      <div className="mt-10 flex items-center justify-center p-4">
        <Outlet />
      </div>
    </div>
  );
}
