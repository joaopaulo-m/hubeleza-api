/*
  Warnings:

  - You are about to drop the column `lead_comission_percentage` on the `affiliates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "affiliates" DROP COLUMN "lead_comission_percentage",
ADD COLUMN     "lead_comission_amount" INTEGER;
