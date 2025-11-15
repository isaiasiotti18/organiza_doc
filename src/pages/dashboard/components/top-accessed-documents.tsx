import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const accessData = [
  { name: 'Fatura #001', views: 142 },
  { name: 'Contrato A', views: 98 },
  { name: 'Certidão', views: 87 },
  { name: 'Boleto #12', views: 56 },
  { name: 'RG Cópia', views: 43 }
]

export function TopAccessedDocuments() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Documentos Mais Consultados</CardTitle>
        <CardDescription>Últimos 30 dias</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={accessData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" width={100} type="category" />
            <Tooltip />
            <Bar dataKey="views" fill="hsl(var(--color-chart-1))" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
