-- AlterTable
ALTER TABLE "affiliates" ADD COLUMN     "ig_username" TEXT NOT NULL DEFAULT '@',
ADD COLUMN     "phone_number" TEXT NOT NULL DEFAULT '';
