-- AlterTable
ALTER TABLE "invite_tokens" ADD COLUMN     "operator_id" TEXT,
ADD COLUMN     "transaction_id" TEXT;

-- AddForeignKey
ALTER TABLE "invite_tokens" ADD CONSTRAINT "invite_tokens_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "operators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invite_tokens" ADD CONSTRAINT "invite_tokens_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "operator_transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
