/*
  Warnings:

  - You are about to drop the column `consumer_id` on the `address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address_id]` on the table `consumer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address_id` to the `consumer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_consumer_id_fkey";

-- DropIndex
DROP INDEX "address_consumer_id_key";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "consumer_id";

-- AlterTable
ALTER TABLE "consumer" ADD COLUMN     "address_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "consumer_address_id_key" ON "consumer"("address_id");

-- AddForeignKey
ALTER TABLE "consumer" ADD CONSTRAINT "consumer_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
