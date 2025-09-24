import type { IAffiliateTransactionRepository } from "../../contracts/repos/affiliate-transaction";
import type { AffiliateTransactionDto } from "../../dtos/affiliate-transaction";
import { AffiliateTransactionMapper } from "../../mappers/affiliate-transaction";

export interface FetchAffiliateTransactionsDto {
  affiliate_id: string
  type?: string
  partner_name?: string
  start_date?: number
  end_date?: number
}

export class GetAffiliateTransactionsUseCase {
  constructor(
    private readonly affiliateTransactionRepo: IAffiliateTransactionRepository
  ){}

  async execute(props: FetchAffiliateTransactionsDto): Promise<AffiliateTransactionDto[]> {
    const transactions = await this.affiliateTransactionRepo.getAll(props)

    return transactions.map(AffiliateTransactionMapper.toDto)
  }
}