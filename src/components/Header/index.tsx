import { HeaderContainer } from "./style";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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
        <form className="flex flex-row gap-2">
          <Input 
            type="file"
            name="sendDocument"
            id=""
            accept="image/*,.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            multiple
          />
          <Button type="submit">Enviar Documento</Button>
        </form>
      )}
    </HeaderContainer>
  );
}
