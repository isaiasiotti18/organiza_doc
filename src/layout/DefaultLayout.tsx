import { Outlet } from "react-router-dom";
import { Header } from "../components/Header"

export function DefaultLayout() {
  return(
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex items-center justify-center p-4 mt-10">
        <Outlet />
      </div>
    </div>
  )
}