import { Bell, HomeIcon, LayoutDashboard } from "lucide-react";
import { FormSubmitNewDocument } from "@/components/SubmitNewDocument/FormSubmitNewDocument";
import { DialogSubmitNewDocument } from "@/components/SubmitNewDocument/DialogSubmitNewDocument";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Notifications } from "@/components/Notifications";

interface HeaderProps {
  displayFormInHeader?: boolean;
  children?: React.ReactNode;
  homeIcon?: boolean;
}

export function Header({ displayFormInHeader = false, children }: HeaderProps) {
  return (
    <header className="flex h-13 w-full items-center justify-between bg-white p-2 text-center shadow">
      <div className="flex flex-row items-center gap-5">
        {children}
        <div className="flex flex-row items-center gap-3">
          <span className="text-xl font-bold">OrganizaDoc</span>
          <div className="h-[100%] w-[2px] bg-gray-100">&nbsp;</div>
          <Link
            className="flex flex-row items-center gap-2 text-xl font-bold text-blue-400"
            to="/dashboard"
          >
            <LayoutDashboard />
            Dash
          </Link>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-5">
        <div>
          <Notifications />
        </div>
        <div className="h-[100%] w-[2px] bg-gray-100">&nbsp;</div>
        <div>
          {displayFormInHeader && (
            <DialogSubmitNewDocument>
              <FormSubmitNewDocument />
            </DialogSubmitNewDocument>
          )}
        </div>
      </div>
    </header>
  );
}
