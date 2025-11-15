import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const statusData = [
  { status: "Aprovados", count: 1923, fill: "hsl(var(--color-chart-3))" },
  { status: "Pendentes", count: 645, fill: "hsl(var(--color-chart-4))" },
  { status: "Em Análise", count: 156, fill: "hsl(var(--color-chart-2))" },
  { status: "Rejeitados", count: 32, fill: "hsl(var(--color-chart-1))" },
];

export function DocumentStatus() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Status dos Documentos</CardTitle>
        <CardDescription>
          Distribuição de documentos por status de processamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="hsl(var(--color-chart-1))"
              radius={[8, 8, 0, 0]}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
