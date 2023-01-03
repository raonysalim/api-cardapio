-- DropForeignKey
ALTER TABLE "Itens" DROP CONSTRAINT "Itens_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "Itens" ADD CONSTRAINT "Itens_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
