/*
  Warnings:

  - Added the required column `created_at` to the `invite_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `invite_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invite_tokens" ADD COLUMN     "created_at" BIGINT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL;
