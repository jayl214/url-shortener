/*
  Warnings:

  - A unique constraint covering the columns `[userId,originalLink]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Link_userId_originalLink_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Link_userId_originalLink_key" ON "Link"("userId", "originalLink");
