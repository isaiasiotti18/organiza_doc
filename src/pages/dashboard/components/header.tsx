import { FileText, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-primary to-primary/70 rounded-lg">
          <FileText className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">OrganizaDoc</h1>
          <p className="text-sm text-muted-foreground">Seu gerenciador inteligente de documentos</p>
        </div>
      </div>
      <Button variant="outline" size="icon">
        <Menu className="w-5 h-5" />
      </Button>
    </div>
  )
}
