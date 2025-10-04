import { AffiliateTransaction } from "../../../domain/entities/affiliate-transaction"
import type { Partner } from "../../../domain/entities/partner"
import type { Transaction } from "../../../domain/entities/transaction"
import { AffiliateStatus } from "../../../domain/enums/affiliate-status"
import { TransactionStatus } from "../../../domain/enums/transaction-status"
import { TransactionType } from "../../../domain/enums/transaction-type"
import { AffiliateCommissionType } from "../../../shared/enums/affiliate-comission-type"
import type { IAffiliateRepository } from "../../contracts/repos/affiliate"
import type { IAffiliateTransactionRepository } from "../../contracts/repos/affiliate-transaction"
import type { IAffiliateWalletRepository } from "../../contracts/repos/affiliate-wallet"
import type { IConfigRepository } from "../../contracts/repos/config"
import type { IPartnerRepository } from "../../contracts/repos/partner"
import type { ITransactionRepository } from "../../contracts/repos/transaction"

export interface AddAffiliateComissionDto {
  type: AffiliateCommissionType
  affiliate_id: string
  transaction_id?: string
  partner_id?: string
  lead_id?: string
}

interface GetComissionAmountProps {
  type: AffiliateCommissionType
  lead_price: number
  comission_percentage: number
  transaction_amount?: number
  lead_comission_amount?: number
}

export class AddAffiliateComissionUseCase {
  constructor(
    private readonly affiliateRepo: IAffiliateRepository,
    private readonly affiliateWalletRepo: IAffiliateWalletRepository,
    private readonly affiliateTransactionRepo: IAffiliateTransactionRepository,
    private readonly transactionRepo: ITransactionRepository,
    private readonly configRepo: IConfigRepository,
    private readonly partnerRepo: IPartnerRepository
  ){}

  async execute(props: AddAffiliateComissionDto): Promise<Error | void> {
    const affiliate = await this.affiliateRepo.findById(props.affiliate_id)

    if (!affiliate) {
      return new Error("Affiliate not found")
    }

    if (affiliate.status !== AffiliateStatus.ACTIVE) {
      return new Error("Invalid affiliate status")
    }

    const wallet = await this.affiliateWalletRepo.findByAffiliateId(affiliate.id)

    if (!wallet) {
      return new Error("Affiliate wallet not found")
    }

    let transaction: Transaction | null = null
    let partner: Partner | null = null
    
    if (props.type === AffiliateCommissionType.SIGN_UP) {
      if (props.transaction_id) {
        transaction = await this.transactionRepo.findById(props.transaction_id)
      }
      
      if (props.partner_id) {
        partner = await this.partnerRepo.findById(props.partner_id)
      }

      if (!transaction) {
        return new Error("Transaction not found")
      }

      if (transaction.status !== TransactionStatus.PAID) {
        return new Error("Invalid transaction status")
      }

      if (!partner) {
        return new Error("Partner not found")
      }
    }

    const leadPrice = await this.configRepo.getLeadPrice()

    const getComissionAmountResult = this.getComissionAmount({
      type: props.type,
      transaction_amount: transaction?.amount,
      lead_price: leadPrice,
      comission_percentage: affiliate.comission_percentage,
      lead_comission_amount: affiliate.lead_comission_amount
    })

    if (getComissionAmountResult instanceof Error) {
      return getComissionAmountResult
    }

    const creditWalletResult = wallet.credit(getComissionAmountResult)

    if (creditWalletResult instanceof Error) {
      return creditWalletResult
    }

    const affiliateTransaction = new AffiliateTransaction({
      affiliate_wallet_id: wallet.id,
      partner_id: partner ? partner.id : undefined,
      lead_id: props.lead_id,
      lead_price: props.type === AffiliateCommissionType.LEAD_REFERRAL ? leadPrice : undefined,
      lead_comission_amount: props.type === AffiliateCommissionType.LEAD_REFERRAL ? affiliate.lead_comission_amount : undefined,
      type: TransactionType.INCOME,
      amount: getComissionAmountResult,
      comission_percentage: props.type === AffiliateCommissionType.SIGN_UP ? affiliate.lead_comission_amount : undefined,
    })

    await this.affiliateTransactionRepo.create(affiliateTransaction)
    await this.affiliateWalletRepo.update(wallet)

    return void 0;
  }

  private getComissionAmount(props: GetComissionAmountProps): Error | number {
    let amount = 0

    if (props.type === AffiliateCommissionType.LEAD_REFERRAL) {
      if (!props.lead_comission_amount) {
        return new Error("Affiliate does not have lead referral comission")
      }

      amount = props.lead_comission_amount
    }

    if (props.type === AffiliateCommissionType.SIGN_UP) {
      if (!props.transaction_amount) {
        return new Error("Invalid transaction amount")
      }

      amount = (props.transaction_amount * props.comission_percentage) / 100
    }

    return amount
  }
}