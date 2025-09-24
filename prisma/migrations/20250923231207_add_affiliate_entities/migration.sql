-- CreateTable
CREATE TABLE "affiliates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" BIGINT NOT NULL,
    "referral_code" TEXT NOT NULL,
    "comission_percentage" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "affiliates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "affiliate_wallets" (
    "id" TEXT NOT NULL,
    "affiliate_id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "affiliate_wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "affiliate_transactions" (
    "id" TEXT NOT NULL,
    "affiliate_wallet_id" TEXT NOT NULL,
    "partner_id" TEXT,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" BIGINT NOT NULL,
    "comission_percentage" DECIMAL(65,30),

    CONSTRAINT "affiliate_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "affiliate_wallets_affiliate_id_key" ON "affiliate_wallets"("affiliate_id");

-- AddForeignKey
ALTER TABLE "affiliate_wallets" ADD CONSTRAINT "affiliate_wallets_affiliate_id_fkey" FOREIGN KEY ("affiliate_id") REFERENCES "affiliates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_transactions" ADD CONSTRAINT "affiliate_transactions_affiliate_wallet_id_fkey" FOREIGN KEY ("affiliate_wallet_id") REFERENCES "affiliate_wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_transactions" ADD CONSTRAINT "affiliate_transactions_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;
