import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Bell className="text-gray-500" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        className="w-[--radix-popper-anchor-width]"
      >
        <DropdownMenuLabel>Próximos Vencimentos</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Documento - Dias Faltantes - Vencimento
        </DropdownMenuItem>
        <DropdownMenuItem>
          Documento - Dias Faltantes - Vencimento
        </DropdownMenuItem>
        <DropdownMenuItem>
          Documento - Dias Faltantes - Vencimento
        </DropdownMenuItem>
        <DropdownMenuItem>
          Documento - Dias Faltantes - Vencimento
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
