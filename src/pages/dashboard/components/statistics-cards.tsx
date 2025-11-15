import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react'

const stats = [
  {
    title: 'Total de Documentos',
    value: '2,847',
    icon: TrendingUp,
    color: 'from-blue-500 to-blue-600',
    change: '+12% vs mês anterior'
  },
  {
    title: 'Documentos Vencidos',
    value: '24',
    icon: AlertCircle,
    color: 'from-red-500 to-red-600',
    change: '3 críticos'
  },
  {
    title: 'Documentos Aprovados',
    value: '1,923',
    icon: CheckCircle,
    color: 'from-green-500 to-green-600',
    change: '67.6% do total'
  },
  {
    title: 'Em Processamento',
    value: '156',
    icon: Clock,
    color: 'from-amber-500 to-amber-600',
    change: 'Aguardando ação'
  }
]

export function StatisticsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
