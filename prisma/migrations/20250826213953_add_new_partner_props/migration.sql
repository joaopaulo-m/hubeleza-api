/*
  Warnings:

  - Added the required column `city` to the `partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_name` to the `partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `treatments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_lead_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_wallet_id_fkey";

-- DropForeignKey
ALTER TABLE "wallets" DROP CONSTRAINT "wallets_partner_id_fkey";

-- AlterTable
ALTER TABLE "partners" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "cnpj" TEXT,
ADD COLUMN     "company_name" TEXT NOT NULL,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "treatments" ADD COLUMN     "category" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "treatment_state_prices" (
    "id" TEXT NOT NULL,
    "treatment_id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "treatment_state_prices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "treatment_state_prices" ADD CONSTRAINT "treatment_state_prices_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
