import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function QuickSearch() {
  return (
    <div className="flex gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar documentos, categoria ou palavra-chave..."
          className="pl-10 h-10"
        />
      </div>
      <Button variant="outline" size="icon">
        <Filter className="w-4 h-4" />
      </Button>
    </div>
  )
}
