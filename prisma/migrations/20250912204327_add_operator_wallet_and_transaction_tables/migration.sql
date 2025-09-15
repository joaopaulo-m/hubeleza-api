-- CreateTable
CREATE TABLE "operator_wallets" (
    "id" TEXT NOT NULL,
    "operator_id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "external_id" TEXT,

    CONSTRAINT "operator_wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operator_transactions" (
    "id" TEXT NOT NULL,
    "operator_wallet_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" BIGINT NOT NULL,
    "external_id" TEXT,
    "comission_percentage" DECIMAL(65,30),

    CONSTRAINT "operator_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "operator_wallets_operator_id_key" ON "operator_wallets"("operator_id");

-- CreateIndex
CREATE UNIQUE INDEX "operator_transactions_operator_wallet_id_key" ON "operator_transactions"("operator_wallet_id");

-- AddForeignKey
ALTER TABLE "operator_wallets" ADD CONSTRAINT "operator_wallets_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "operators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operator_transactions" ADD CONSTRAINT "operator_transactions_operator_wallet_id_fkey" FOREIGN KEY ("operator_wallet_id") REFERENCES "operator_wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
