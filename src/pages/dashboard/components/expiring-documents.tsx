import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertTriangle, OctagonAlert, XCircle } from "lucide-react";
import { useGetUpcomingDueDate } from "@/hooks/dashboard/use-get-upcoming-due-dates";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function ExpiringDocuments() {
  const { data: notifications = [] } = useGetUpcomingDueDate();

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="text-primary h-5 w-5" />
          Próximos Vencimentos
        </CardTitle>
        <CardDescription>Documentos por vencer</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {notifications.map((item) => {
          const expired = item.days_left <= 0;
          const critical = item.days_left > 0 && item.days_left <= 5;

          return (
            <div
              key={item.id}
              className="hover:bg-muted/50 flex items-start gap-3 rounded-lg p-2 transition-colors"
            >
              <div className="mt-1">
                {expired && <XCircle className="text-destructive h-4 w-4" />}

                {critical && (
                  <OctagonAlert className="h-4 w-4 text-yellow-500" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-foreground truncate text-sm font-medium">
                  {item.message ?? "Documento"}
                </p>

                <p className="text-muted-foreground text-xs">
                  {format(new Date(item.expires_at), "dd/MM/yyyy", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              <Badge
                variant={
                  expired
                    ? "destructive"
                    : critical
                      ? "destructive"
                      : "secondary"
                }
                className={`flex-shrink-0 text-xs ${critical ? "bg-yellow-500" : ""}`}
              >
                {expired ? "Vencido" : `${item.days_left} dias`}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
