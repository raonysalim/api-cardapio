/*
  Warnings:

  - You are about to drop the column `photo` on the `Itens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Itens" DROP COLUMN "photo",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "image_url" TEXT;
