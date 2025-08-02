import { HeaderContainer } from "./style";
import { SubmitNewDocument } from "../SendDocument";
import { FormDialogComponent } from "./FormDialogComponent";

interface HeaderProps {
  displayFormInHeader: boolean;
  children?: React.ReactNode
}

export function Header({ displayFormInHeader, children }: HeaderProps) {
  return (
    <HeaderContainer className="flex w-full h-13 bg-white shadow p-2 text-center">
      <div className="flex flex-row gap-5">
        {children}
        <span className="text-xl font-bold">OrganizaDoc</span>
      </div>
      {displayFormInHeader && (
      <FormDialogComponent>
        <SubmitNewDocument />
      </FormDialogComponent>
      )}
    </HeaderContainer>
  );
}
