/*
  Warnings:

  - You are about to drop the `Categorie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategorieToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategorieToProduct" DROP CONSTRAINT "_CategorieToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategorieToProduct" DROP CONSTRAINT "_CategorieToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Categorie";

-- DropTable
DROP TABLE "_CategorieToProduct";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
