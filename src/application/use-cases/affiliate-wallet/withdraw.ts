import { AffiliateTransaction } from "../../../domain/entities/affiliate-transaction";
import { TransactionType } from "../../../domain/enums/transaction-type";
import type { PixAddressKeyType } from "../../../shared/enums/pix-address-key-type";
import type { IAffiliateRepository } from "../../contracts/repos/affiliate";
import type { IAffiliateTransactionRepository } from "../../contracts/repos/affiliate-transaction";
import type { IAffiliateWalletRepository } from "../../contracts/repos/affiliate-wallet";
import type { IPaymentService } from "../../contracts/services/payment";

export interface WithdrawAffiliateWalletDto {
  affiliate_id: string
  pix_address_key_type: string
  pix_address_key: string
  amount: number
}

export class WithdrawAffiliateWalletUseCase {
  constructor(
    private readonly affiliateRepo: IAffiliateRepository,
    private readonly affiliateWalletRepo: IAffiliateWalletRepository,
    private readonly affiliateTransactionRepo: IAffiliateTransactionRepository,
    private readonly paymentService: IPaymentService
  ){}

  async execute(props: WithdrawAffiliateWalletDto): Promise<Error | void> {
    const affiliate = await this.affiliateRepo.findById(props.affiliate_id)

    if (!affiliate) {
      return new Error("Affiliate not found")
    }

    const affiliateWallet = await this.affiliateWalletRepo.findByAffiliateId(affiliate.id)

    if (!affiliateWallet) {
      return new Error("Affiliate wallet not found")
    }

    const debitWalletResult = affiliateWallet.debit(props.amount)

    if (debitWalletResult instanceof Error) {
      return debitWalletResult
    }

    const sendPaymentResult = await this.paymentService.sendPixPayment({
      pix_address_key: props.pix_address_key,
      pix_address_key_type: props.pix_address_key_type as PixAddressKeyType,
      amount: props.amount
    })

    if (sendPaymentResult instanceof Error) {
      console.error("Error sending pix payment: ", sendPaymentResult)
      return sendPaymentResult
    }

    const affiliateTransaction = new AffiliateTransaction({
      affiliate_wallet_id: affiliateWallet.id,
      type: TransactionType.EXPENSE,
      amount: props.amount
    })

    await this.affiliateWalletRepo.update(affiliateWallet)
    await this.affiliateTransactionRepo.create(affiliateTransaction)

    return void 0;
  }
}