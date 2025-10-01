-- AlterTable
ALTER TABLE "affiliate_transactions" ADD COLUMN     "lead_id" TEXT,
ADD COLUMN     "lead_price" INTEGER;

-- AddForeignKey
ALTER TABLE "affiliate_transactions" ADD CONSTRAINT "affiliate_transactions_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE SET NULL ON UPDATE CASCADE;
