/*
  Warnings:

  - You are about to drop the column `mood` on the `SleepLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SleepLog" DROP COLUMN "mood",
ADD COLUMN     "vitality" DOUBLE PRECISION;
