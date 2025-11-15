import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, FileX } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const alerts = [
  {
    type: "crítico",
    title: "Fatura #FT-2024-001 vencida há 5 dias",
    description: "Ação necessária: Pagamento ou atualização",
    icon: AlertTriangle,
  },
  {
    type: "aviso",
    title: "Certidão de nascimento vence em 2 dias",
    description: "Antecipe a renovação para evitar problemas",
    icon: Clock,
  },
  {
    type: "erro",
    title: "Boleto incompletou - faltam informações",
    description: "CPF/CNPJ ausente - documento não pode ser processado",
    icon: FileX,
  },
];

export function Alerts() {
  return (
    <Card className="from-destructive/5 border-0 bg-gradient-to-r to-transparent shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">⚠️ Alertas Importantes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          const colorMap = {
            crítico: "bg-destructive text-destructive-foreground",
            aviso: "bg-amber-600 text-white",
            erro: "bg-red-600 text-white",
          };
          return (
            <div
              key={index}
              className="bg-background border-border flex gap-3 rounded-lg border p-3"
            >
              <Icon className="text-destructive mt-0.5 h-5 w-5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-foreground text-sm font-medium">
                  {alert.title}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {alert.description}
                </p>
              </div>
              <Badge
                className={`${colorMap[alert.type as keyof typeof colorMap]} flex-shrink-0 text-xs`}
              >
                {alert.type}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
