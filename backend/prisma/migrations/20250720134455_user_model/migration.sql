/*
  Warnings:

  - You are about to drop the column `category` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "category",
DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
