-- AlterTable
ALTER TABLE "partners" ADD COLUMN     "affiliate_id" TEXT;

-- AddForeignKey
ALTER TABLE "partners" ADD CONSTRAINT "partners_affiliate_id_fkey" FOREIGN KEY ("affiliate_id") REFERENCES "affiliates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
