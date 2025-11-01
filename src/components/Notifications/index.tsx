import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useUpdateNotificationDays } from "@/hooks/notifications/use-update-notification-days";
import { useNotificationSettings } from "@/hooks/notifications/use-notification-settings";

export function Notifications() {
  const [daysBeforeExpiry, setDaysBeforeExpiry] = useState(20);

  const { data } = useNotificationSettings();
  const updateNotificationDays = useUpdateNotificationDays();

  useEffect(() => {
    if (data !== undefined) {
      setDaysBeforeExpiry(data);
    }
  }, [data]);

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
        <DropdownMenuLabel>Aviso - dias antes do vencimento</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          className="flex flex-row items-center justify-between gap-2"
          value={String(daysBeforeExpiry)}
          onValueChange={(value: string) => {
            const num = Number(value);
            setDaysBeforeExpiry(num);
            updateNotificationDays.mutate(num);
          }}
        >
          <DropdownMenuRadioItem className="flex-1" value="20">
            20 dias
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex-1" value="14">
            14 dias
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex-1" value="7">
            7 dias
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Próximos Vencimentos</DropdownMenuLabel>
        <DropdownMenuGroup>
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
