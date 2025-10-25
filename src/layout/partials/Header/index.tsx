import { HomeIcon } from "lucide-react";
import { FormSubmitNewDocument } from "@/components/SubmitNewDocument/FormSubmitNewDocument";
import { DialogSubmitNewDocument } from "@/components/SubmitNewDocument/DialogSubmitNewDocument";
import { Link } from "react-router-dom";

interface HeaderProps {
  displayFormInHeader?: boolean;
  children?: React.ReactNode;
  homeIcon?: boolean;
}

export function Header({
  displayFormInHeader = false,
  children,
  homeIcon = false,
}: HeaderProps) {
  return (
    <header className="flex h-13 w-full items-center justify-between bg-white p-2 text-center shadow">
      <div className="flex flex-row gap-5">
        {children}
        <span className="text-xl font-bold">OrganizaDoc</span>
      </div>
      {displayFormInHeader && (
        <DialogSubmitNewDocument>
          <FormSubmitNewDocument />
        </DialogSubmitNewDocument>
      )}
      {homeIcon && (
        <Link to="/app/home">
          <HomeIcon className="mr-4" />
        </Link>
      )}
    </header>
  );
}
