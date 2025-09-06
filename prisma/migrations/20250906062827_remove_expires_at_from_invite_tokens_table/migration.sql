/*
  Warnings:

  - You are about to drop the column `expires_at` on the `invite_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invite_tokens" DROP COLUMN "expires_at";
