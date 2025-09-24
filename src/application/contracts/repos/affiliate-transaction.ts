import type { AffiliateTransaction } from "../../../domain/entities/affiliate-transaction";
import type { FetchAffiliateTransactionsDto } from "../../use-cases/affiliate-transaction/get-all";

export interface IAffiliateTransactionRepository {
  getAll: (props: FetchAffiliateTransactionsDto) => Promise<AffiliateTransaction[]>
  create: (affiliateTransaction: AffiliateTransaction) => Promise<void>
}