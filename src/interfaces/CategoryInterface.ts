import {
  AddressBookIcon,
  BarcodeIcon,
  CreditCardIcon,
  FilesIcon,
  ReceiptIcon,
  BankIcon,
  CertificateIcon,
  Icon,
  FunnelXIcon,
} from "@phosphor-icons/react";

export interface CategoryInterface {
  title: string;
  url: string;
  icon: Icon;
}

export const categories: CategoryInterface[] = [
  {
    title: "Contratos",
    url: "documents/contratos",
    icon: AddressBookIcon,
  },
  {
    title: "Documentos",
    url: "documents/documentos",
    icon: FilesIcon,
  },
  {
    title: "Certidões",
    url: "documents/certidoes",
    icon: CertificateIcon,
  },
  {
    title: "Faturas",
    url: "documents/faturas",
    icon: CreditCardIcon,
  },
  {
    title: "Boletos",
    url: "documents/boletos",
    icon: ReceiptIcon,
  },
  {
    title: "Comprovantes",
    url: "documents/comprovantes",
    icon: BarcodeIcon,
  },
  {
    title: "Extratos",
    url: "documents/extratos",
    icon: BankIcon,
  },
  {
    title: "Todos",
    url: "documents/all",
    icon: FunnelXIcon,
  },
];
