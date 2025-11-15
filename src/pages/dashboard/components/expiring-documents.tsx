import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, AlertTriangle } from 'lucide-react'

const expiringDocs = [
  {
    name: 'Certidão de Nascimento',
    expiresIn: '2 dias',
    date: '17/11/2025',
    priority: 'crítico'
  },
  {
    name: 'Contrato de Fornecedor XYZ',
    expiresIn: '7 dias',
    date: '22/11/2025',
    priority: 'alto'
  },
  {
    name: 'Licença Ambiental',
    expiresIn: '15 dias',
    date: '30/11/2025',
    priority: 'médio'
  },
  {
    name: 'Fatura #FT-2024-045',
    expiresIn: 'Vencido',
    date: '05/11/2025',
    priority: 'crítico'
  }
]

export function ExpiringDocuments() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Próximos Vencimentos
        </CardTitle>
        <CardDescription>Documentos por vencer</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {expiringDocs.map((doc, index) => (
          <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="mt-1">
              {doc.priority === 'crítico' && <AlertTriangle className="w-4 h-4 text-destructive" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
              <p className="text-xs text-muted-foreground">{doc.date}</p>
            </div>
            <Badge
              variant={doc.priority === 'crítico' ? 'destructive' : 'secondary'}
              className="flex-shrink-0 text-xs"
            >
              {doc.expiresIn}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
