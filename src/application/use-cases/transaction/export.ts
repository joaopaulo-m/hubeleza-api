import { stringify } from 'csv-stringify/sync'

import type { ITransactionRepository } from "../../contracts/repos/transaction";
import type { GetTransactionsDto } from "./get-all";
import { TransactionMapper } from '../../mappers/transaction';
import { formatCurrency } from '../../../utils/format-currency';

export class ExportTransactionsUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
  ){}
  
  async execute(props: GetTransactionsDto): Promise<Buffer> {
    const transactions = await this.transactionRepo.getAll(props)
    const transactionDtos = transactions.map(TransactionMapper.toDto)

    const records = transactionDtos.map(t => ({
      ID: t.id,
      Status: t.status,
      Tipo: t.type,
      Valor: formatCurrency(t.amount),
      'Valor Bônus': t.bonus_amount ? formatCurrency(t.bonus_amount) : "R$ 0,00",
      'Preço do Lead': t.lead_price ? formatCurrency(t.lead_price) : "*",
      Lead: t.lead ? t.lead.name : "*",
      Data: new Date(t.created_at).toLocaleDateString()
    }))

    const csv = stringify(records, {
      header: true,
      delimiter: ';',
      quoted: true, // ← Adicione isso para campos com vírgulas/caracteres especiais
      columns: [ // ← Defina explicitamente as colunas para garantir ordem
        'ID',
        'Status',
        'Tipo',
        'Valor',
        'Valor Bônus',
        'Preço do Lead',
        'Lead',
        'Data'
      ]
    })  

    // Adicionar BOM para UTF-8 (melhora compatibilidade com Excel)
    const bom = '\uFEFF'
    return Buffer.from(bom + csv, 'utf-8')
  }
}