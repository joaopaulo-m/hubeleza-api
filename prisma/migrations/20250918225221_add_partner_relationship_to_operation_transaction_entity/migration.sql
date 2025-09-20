-- AlterTable
ALTER TABLE "operator_transactions" ADD COLUMN     "partner_id" TEXT;

-- AddForeignKey
ALTER TABLE "operator_transactions" ADD CONSTRAINT "operator_transactions_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;
