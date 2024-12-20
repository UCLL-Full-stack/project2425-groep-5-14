-- DropForeignKey
ALTER TABLE "Collected" DROP CONSTRAINT "Collected_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "Collected" DROP CONSTRAINT "Collected_gameId_fkey";

-- AlterTable
ALTER TABLE "Collected" ALTER COLUMN "badgeId" DROP NOT NULL,
ALTER COLUMN "gameId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Collected" ADD CONSTRAINT "Collected_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collected" ADD CONSTRAINT "Collected_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
