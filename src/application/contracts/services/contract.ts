export type GenerateContractProps = {
  client_name: string
  company_name: string
  cpf: string
  city: string
  state: string
};

export interface IContractService {
  generatePDF(data: GenerateContractProps): Promise<Buffer>;
}
