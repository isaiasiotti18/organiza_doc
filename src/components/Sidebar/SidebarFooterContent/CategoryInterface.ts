import { 
  AddressBookIcon,
  BarcodeIcon,
  CreditCardIcon,
  FilesIcon,
  ReceiptIcon,
  BankIcon,
  CertificateIcon,
  Icon
} from '@phosphor-icons/react'

export interface CategoryInterface {
  title: string
  url: string
  icon: Icon
}

export const categories: CategoryInterface[] = [
  {
    title: 'Contratos',
    url: 'category/contratos',
    icon: AddressBookIcon
  },
  {
    title: 'Documentos',
    url: 'category/documentos',
    icon: FilesIcon
  }, 
  {
    title: 'Certidões',
    url: 'category/certidoes',
    icon: CertificateIcon 
  }, 
  {
    title: 'Faturas',
    url: 'category/faturas',
    icon: CreditCardIcon
  },
  {
    title: 'Boletos',
    url: 'category/boletos',
    icon: ReceiptIcon
  },
  {
    title: 'Comprovantes',
    url: 'category/comprovantes',
    icon: BarcodeIcon
  },
  {
    title: 'Extratos',
    url: 'category/extratos',
    icon: BankIcon
  },
]