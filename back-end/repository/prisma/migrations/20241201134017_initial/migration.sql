-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user', 'test');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collected" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "badgeId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "collectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Collected_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Collected" ADD CONSTRAINT "Collected_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collected" ADD CONSTRAINT "Collected_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collected" ADD CONSTRAINT "Collected_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
