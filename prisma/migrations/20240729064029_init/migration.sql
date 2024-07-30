/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_mobile_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "mobile",
DROP COLUMN "name",
ADD COLUMN     "password" TEXT NOT NULL;
