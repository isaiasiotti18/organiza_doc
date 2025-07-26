import { 
  AddressBook,
  Barcode,
  CreditCard,
  Files,
  IconProps,
  Receipt,
} from 'phosphor-react'

export interface CategoryInterface {
  title: string
  url: string
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
}

export const categories: CategoryInterface[] = [
  {
    title: 'Contratos',
    url: 'category/contratos',
    icon: AddressBook
  },
  {
    title: 'Faturas',
    url: 'category/faturas',
    icon: CreditCard
  },
  {
    title: 'Boletos',
    url: 'category/boletos',
    icon: Receipt
  },
  {
    title: 'Documentos',
    url: 'category/documentos',
    icon: Files
  },
  {
    title: 'Comprovantes',
    url: 'category/comprovantes',
    icon: Barcode
  }  
]