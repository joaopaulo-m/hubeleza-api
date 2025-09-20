-- AlterTable
ALTER TABLE "partners" ADD COLUMN     "operator_id" TEXT;

-- AddForeignKey
ALTER TABLE "partners" ADD CONSTRAINT "partners_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "operators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
