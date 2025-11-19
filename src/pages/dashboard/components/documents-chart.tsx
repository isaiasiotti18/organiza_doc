/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";
import { useCountDocumentsByCategory } from "@/hooks/dashboard/use-count-documents-by-category";
import { Spinner } from "@/components/ui/spinner";

export function DocumentsChart() {
  const { data, isLoading, isError } = useCountDocumentsByCategory();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (isError) return null;
  if (isLoading || !data) return <Spinner />;

  // Paleta infinita baseada em cores tailwind estáveis
  const tailwindColors = [
    "#3b82f6", // blue-500
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#ef4444", // red-500
    "#8b5cf6", // violet-500
    "#14b8a6", // teal-500
    "#ec4899", // pink-500
    "#6366f1", // indigo-500
  ];

  const categoryData = data.map((item, idx) => ({
    ...item,
    fill: tailwindColors[idx % tailwindColors.length],
  }));

  const total = categoryData.reduce((acc, cur) => acc + cur.value, 0);

  const handleDrilldown = (entry: any) => {
    if (!entry || !entry.name) return;
    setSelectedCategory(entry.name);
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Distribuição de Documentos por Categoria</CardTitle>
        <CardDescription>
          Total de {total.toLocaleString("pt-BR")} documentos cadastrados
          {selectedCategory && (
            <span className="mt-1 block">
              Categoria selecionada: <strong>{selectedCategory}</strong>
            </span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              animationBegin={0}
              animationDuration={900}
              animationEasing="ease-out"
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              outerRadius={85}
              dataKey="value"
              onClick={handleDrilldown}
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  cursor="pointer"
                />
              ))}
            </Pie>

            <Tooltip formatter={(value) => value.toLocaleString("pt-BR")} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
