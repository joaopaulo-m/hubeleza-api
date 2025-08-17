/*
  Warnings:

  - You are about to drop the column `treatment_id` on the `forms` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_treatment_id_fkey";

-- AlterTable
ALTER TABLE "forms" DROP COLUMN "treatment_id";

-- CreateTable
CREATE TABLE "forms_treatments" (
    "id" TEXT NOT NULL,
    "form_id" TEXT NOT NULL,
    "treatment_id" TEXT NOT NULL,

    CONSTRAINT "forms_treatments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "forms_treatments" ADD CONSTRAINT "forms_treatments_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms_treatments" ADD CONSTRAINT "forms_treatments_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
