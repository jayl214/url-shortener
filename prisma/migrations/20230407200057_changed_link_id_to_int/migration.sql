/*
  Warnings:

  - The primary key for the `Link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Link` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "originalLink" TEXT NOT NULL,
    "shortLinkParam" TEXT NOT NULL,
    CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("id", "originalLink", "shortLinkParam", "userId") SELECT "id", "originalLink", "shortLinkParam", "userId" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE UNIQUE INDEX "Link_shortLinkParam_key" ON "Link"("shortLinkParam");
CREATE UNIQUE INDEX "Link_userId_originalLink_key" ON "Link"("userId", "originalLink");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
