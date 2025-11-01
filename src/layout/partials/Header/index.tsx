import { Bell, HomeIcon } from "lucide-react";
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
      <div className="flex flex-row gap-5">
        {children}
        <span className="text-xl font-bold">OrganizaDoc</span>
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
