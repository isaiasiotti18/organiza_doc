import { HomeIcon } from "lucide-react";
import { SubmitNewDocument } from "../SendDocument";
import { FormDialogComponent } from "./FormDialogComponent";
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
        <FormDialogComponent>
          <SubmitNewDocument />
        </FormDialogComponent>
      )}
      {homeIcon && (
        <Link to="/app/home">
          <HomeIcon />
        </Link>
      )}
    </header>
  );
}
