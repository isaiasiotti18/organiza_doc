import { Bell, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useUpdateNotificationDays } from "@/hooks/notifications/use-update-notification-days";
import { useNotificationSettings } from "@/hooks/notifications/use-notification-settings";
import { useGetNotifications } from "@/hooks/notifications/use-get-notifications";
import { useUnreadNotificationsCount } from "@/hooks/notifications/use-unread-notificaions-count";
import { useMarkNotificationsAsRead } from "@/hooks/notifications/use-mark-notifications-as-read";
import { useDeleteNotification } from "@/hooks/notifications/use-delete-notification";

export function Notifications() {
  const [daysBeforeExpiry, setDaysBeforeExpiry] = useState(20);

  const { data } = useNotificationSettings();
  const updateNotificationDays = useUpdateNotificationDays();

  const { data: notifications } = useGetNotifications();
  const { data: unreadCount } = useUnreadNotificationsCount();
  const markRead = useMarkNotificationsAsRead();
  const deleteNotification = useDeleteNotification();

  useEffect(() => {
    if (data !== undefined) {
      setDaysBeforeExpiry(data);
    }
  }, [data]);

  return (
    <DropdownMenu onOpenChange={(open) => open && markRead.mutate()}>
      <DropdownMenuTrigger asChild>
        <button className="relative">
          <Bell className="text-gray-500" />
          {unreadCount !== undefined && unreadCount > 0 && (
            <span className="absolute -top-1 -right-2 rounded-full bg-red-600 px-1 text-xs text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        className="w-[--radix-popper-anchor-width]"
      >
        <DropdownMenuLabel>Aviso - dias antes do vencimento</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          className="grid grid-cols-3 gap-2"
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
          {notifications?.length ? (
            notifications.map((n) => (
              <DropdownMenuItem
                key={n.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{n.message}</span>
                  <span className="text-muted-foreground text-xs">
                    vence {new Date(n.expires_at).toLocaleDateString()} —{" "}
                    {n.days_left} dias
                  </span>
                </div>

                <button
                  className="p-1 text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification.mutate(n.id);
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem className="text-muted-foreground text-sm">
              Nenhuma notificação
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
