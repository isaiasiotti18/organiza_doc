export interface DocumentCardProps {
  name: string;
  description: string;
  category: string | undefined;
  url: string;
}

export const documentsArray: DocumentCardProps[] = [
  { name: "CNH", description: "Carteira de habilitação!", category: "declarações", url: "https://meudocumento.com.br/cnh" },
  { name: "RG", description: "Documento de identidade!", category: "faturas", url: "https://meudocumento.com.br/rg" },
  { name: "CPF", description: "Cadastro de pessoa física!", category: "contratos", url: "https://meudocumento.com.br/cpf" },
  { name: "Passaporte", description: "Documento para viagens!", category: "boletos", url: "https://meudocumento.com.br/passaporte" },
  { name: "Título de Eleitor", description: "Documento eleitoral!", category: "comprovantes", url: "https://meudocumento.com.br/título-de-eleitor" },
  { name: "CRLV", description: "Licenciamento veicular!", category: "licenças", url: "https://meudocumento.com.br/crlv" },
  { name: "Carteira de Trabalho", description: "Registro profissional!", category: "certidões", url: "https://meudocumento.com.br/carteira-de-trabalho" },
  { name: "Certidão de Nascimento", description: "Registro de nascimento!", category: "declarações", url: "https://meudocumento.com.br/certidão-de-nascimento" },
  { name: "Certidão de Casamento", description: "Registro de casamento!", category: "faturas", url: "https://meudocumento.com.br/certidão-de-casamento" },
  { name: "Contrato de Aluguel", description: "Locação de imóvel!", category: "faturas", url: "https://meudocumento.com.br/contrato-de-aluguel" },
  { name: "Contrato de Compra", description: "Aquisição de bem!", category: "certidões", url: "https://meudocumento.com.br/contrato-de-compra" },
  { name: "Boleto de Luz", description: "Conta de energia!", category: "licenças", url: "https://meudocumento.com.br/boleto-de-luz" },
  { name: "Boleto de Água", description: "Conta de água!", category: "contratos", url: "https://meudocumento.com.br/boleto-de-água" },
  { name: "Fatura do Cartão", description: "Cobrança mensal!", category: "declarações", url: "https://meudocumento.com.br/fatura-do-cartão" },
  { name: "Fatura de Celular", description: "Conta telefônica!", category: "contratos", url: "https://meudocumento.com.br/fatura-de-celular" },
  { name: "Comprovante de Residência", description: "Endereço atualizado!", category: "comprovantes", url: "https://meudocumento.com.br/comprovante-de-residência" },
  { name: "Comprovante de Renda", description: "Prova de ganhos!", category: "faturas", url: "https://meudocumento.com.br/comprovante-de-renda" },
  { name: "Licença Médica", description: "Dispensa por saúde!", category: "faturas", url: "https://meudocumento.com.br/licença-médica" },
  { name: "Licença de Funcionamento", description: "Autorização comercial!", category: "registros", url: "https://meudocumento.com.br/licença-de-funcionamento" },
  { name: "Declaração de Imposto", description: "IRPF anual!", category: "boletos", url: "https://meudocumento.com.br/declaração-de-imposto" },
  { name: "Declaração Escolar", description: "Confirmação de matrícula!", category: "documentos", url: "https://meudocumento.com.br/declaração-escolar" },
  { name: "Registro de Imóvel", description: "Posse do imóvel!", category: "contratos", url: "https://meudocumento.com.br/registro-de-imóvel" },
  { name: "Registro de Veículo", description: "Propriedade veicular!", category: "licenças", url: "https://meudocumento.com.br/registro-de-veículo" },
]