import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const metricsData = [
  { day: 'Seg', avgTime: 4.2, efficiency: 85 },
  { day: 'Ter', avgTime: 3.8, efficiency: 88 },
  { day: 'Qua', avgTime: 4.5, efficiency: 82 },
  { day: 'Qui', avgTime: 3.2, efficiency: 91 },
  { day: 'Sex', avgTime: 3.9, efficiency: 87 }
]

export function ProcessingMetrics() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Análise de Desempenho</CardTitle>
        <CardDescription>Tempo médio de processamento (em horas)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={metricsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="avgTime"
              stroke="hsl(var(--color-chart-2))"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
