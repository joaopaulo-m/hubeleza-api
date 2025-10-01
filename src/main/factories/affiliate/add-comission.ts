import { AddAffiliateComissionUseCase } from "../../../application/use-cases/affiliate/add-comission"
import { PrismaAffiliateRepository } from "../../../infrastructure/repos/prisma/affiliate"
import { PrismaAffiliateTransactionRepository } from "../../../infrastructure/repos/prisma/affiliate-transaction"
import { PrismaAffiliateWalletRepository } from "../../../infrastructure/repos/prisma/affiliate-wallet"
import { PrismaConfigRepository } from "../../../infrastructure/repos/prisma/config"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { PrismaTransactionRepository } from "../../../infrastructure/repos/prisma/transaction"

export const makeAddAffiliateComissionUseCase = () => {
  const affiliateRepo = new PrismaAffiliateRepository()
  const affiliateWalletRepo = new PrismaAffiliateWalletRepository()
  const affiliateTransactionRepo = new PrismaAffiliateTransactionRepository()
  const transactionRepo = new PrismaTransactionRepository()
  const configRepo = new PrismaConfigRepository()
  const partnerRepo = new PrismaPartnerRepository()
  return new AddAffiliateComissionUseCase(
    affiliateRepo,
    affiliateWalletRepo,
    affiliateTransactionRepo,
    transactionRepo,
    configRepo,
    partnerRepo
  )
}