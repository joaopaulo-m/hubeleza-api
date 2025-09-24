import { AffiliateTransaction } from "../../../domain/entities/affiliate-transaction"
import { TransactionStatus } from "../../../domain/enums/transaction-status"
import { TransactionType } from "../../../domain/enums/transaction-type"
import type { IAffiliateRepository } from "../../contracts/repos/affiliate"
import type { IAffiliateTransactionRepository } from "../../contracts/repos/affiliate-transaction"
import type { IAffiliateWalletRepository } from "../../contracts/repos/affiliate-wallet"
import type { IPartnerRepository } from "../../contracts/repos/partner"
import type { ITransactionRepository } from "../../contracts/repos/transaction"

export interface AddAffiliateComissionDto {
  affiliate_id: string
  transaction_id: string
  partner_id: string
}

export class AddAffiliateComissionUseCase {
  constructor(
    private readonly affiliateRepo: IAffiliateRepository,
    private readonly affiliateWalletRepo: IAffiliateWalletRepository,
    private readonly affiliateTransactionRepo: IAffiliateTransactionRepository,
    private readonly transactionRepo: ITransactionRepository,
    private readonly partnerRepo: IPartnerRepository
  ){}

  async execute(props: AddAffiliateComissionDto): Promise<Error | void> {
    const affiliate = await this.affiliateRepo.findById(props.affiliate_id)

    if (!affiliate) {
      return new Error("Affiliate not found")
    }

    const wallet = await this.affiliateWalletRepo.findByAffiliateId(affiliate.id)

    if (!wallet) {
      return new Error("Affiliate wallet not found")
    }

    const transaction = await this.transactionRepo.findById(props.transaction_id)
    
    if (!transaction) {
      return new Error("Transaction not found")
    }

    if (transaction.status !== TransactionStatus.PAID) {
      return new Error("Invalid transaction status")
    }

    const partner = await this.partnerRepo.findById(props.partner_id)

    if (!partner) {
      return new Error("Partner not found")
    }

    const comissionAmount = (transaction.amount * affiliate.comission_percentage) / 100;
    const creditWalletResult = wallet.credit(comissionAmount)

    if (creditWalletResult instanceof Error) {
      return creditWalletResult
    }

    const affiliateTransaction = new AffiliateTransaction({
      affiliate_wallet_id: wallet.id,
      partner_id: partner.id,
      type: TransactionType.INCOME,
      amount: comissionAmount,
      comission_percentage: affiliate.comission_percentage,
    })

    await this.affiliateTransactionRepo.create(affiliateTransaction)
    await this.affiliateWalletRepo.update(wallet)

    return void 0;
  }
}