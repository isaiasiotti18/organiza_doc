import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const categoryData = [
  { name: "Faturas", value: 452, fill: "hsl(var(--color-chart-1))" },
  { name: "Boletos", value: 328, fill: "hsl(var(--color-chart-2))" },
  { name: "Certidões", value: 245, fill: "hsl(var(--color-chart-3))" },
  { name: "Contratos", value: 187, fill: "hsl(var(--color-chart-4))" },
  { name: "Outros", value: 135, fill: "hsl(var(--color-chart-5))" },
];

export function DocumentsChart() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Distribuição de Documentos por Categoria</CardTitle>
        <CardDescription>Total de 2,847 documentos cadastrados</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => value.toLocaleString("pt-BR")} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
