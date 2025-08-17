/*
  Warnings:

  - Added the required column `created_at` to the `partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `partners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "partners" ADD COLUMN     "created_at" BIGINT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" BIGINT NOT NULL,
    "superadmin" BOOLEAN NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);
