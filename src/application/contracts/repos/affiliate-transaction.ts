import type { AffiliateTransaction } from "../../../domain/entities/affiliate-transaction";
import type { TransactionType } from "../../../domain/enums/transaction-type";
import type { FetchAffiliateTransactionsDto } from "../../use-cases/affiliate-transaction/get-all";

interface CountAllAmountProps {
  affiliate_id: string
  type: TransactionType
}

export interface IAffiliateTransactionRepository {
  countAllAmount: (props: CountAllAmountProps) => Promise<number>
  getAll: (props: FetchAffiliateTransactionsDto) => Promise<AffiliateTransaction[]>
  create: (affiliateTransaction: AffiliateTransaction) => Promise<void>
}