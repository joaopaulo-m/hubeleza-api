/*
  Warnings:

  - You are about to drop the column `treatment_id` on the `leads_dispatch` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "forms_treatments" DROP CONSTRAINT "forms_treatments_form_id_fkey";

-- DropForeignKey
ALTER TABLE "forms_treatments" DROP CONSTRAINT "forms_treatments_treatment_id_fkey";

-- DropForeignKey
ALTER TABLE "leads_dispatch" DROP CONSTRAINT "leads_dispatch_treatment_id_fkey";

-- AlterTable
ALTER TABLE "leads_dispatch" DROP COLUMN "treatment_id";

-- CreateTable
CREATE TABLE "leads_dispatch_treatments" (
    "id" TEXT NOT NULL,
    "lead_dispatch_id" TEXT NOT NULL,
    "treatment_id" TEXT NOT NULL,

    CONSTRAINT "leads_dispatch_treatments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "forms_treatments" ADD CONSTRAINT "forms_treatments_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms_treatments" ADD CONSTRAINT "forms_treatments_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads_dispatch_treatments" ADD CONSTRAINT "leads_dispatch_treatments_lead_dispatch_id_fkey" FOREIGN KEY ("lead_dispatch_id") REFERENCES "leads_dispatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads_dispatch_treatments" ADD CONSTRAINT "leads_dispatch_treatments_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
