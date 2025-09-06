-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "bonus_amount" INTEGER;

-- CreateTable
CREATE TABLE "operators" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" BIGINT NOT NULL,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "operators_pkey" PRIMARY KEY ("id")
);
