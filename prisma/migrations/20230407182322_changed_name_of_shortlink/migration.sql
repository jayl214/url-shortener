/*
  Warnings:

  - You are about to drop the column `shortLink` on the `Link` table. All the data in the column will be lost.
  - Added the required column `shortLinkParam` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "originalLink" TEXT NOT NULL,
    "shortLinkParam" TEXT NOT NULL,
    CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("id", "originalLink", "userId") SELECT "id", "originalLink", "userId" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE UNIQUE INDEX "Link_shortLinkParam_key" ON "Link"("shortLinkParam");
CREATE UNIQUE INDEX "Link_userId_originalLink_id_key" ON "Link"("userId", "originalLink", "id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
