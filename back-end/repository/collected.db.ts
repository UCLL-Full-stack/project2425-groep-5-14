import { PrismaClient } from '@prisma/client';
import { Collected } from '../model/collected';
import { User } from '../model/user';
import { Badge } from '../model/badge';
import { Game } from '../model/game';

const prisma = new PrismaClient();

const getAllCollected = async (): Promise<Collected[]> => {
  const collectedItems = await prisma.collected.findMany({
    include: {
      user: true,
      badge: true,
      game: true,
    },
  });
  return collectedItems.map((collected: any) => new Collected(collected));
};

const getCollectedById = async (id: number): Promise<Collected | null> => {
  const collected = await prisma.collected.findUnique({
    where: { id },
    include: {
      user: true,
      badge: true,
      game: true,
    },
  });
  return collected ? new Collected({
    ...collected,
    user: new User(collected.user),
    badge: new Badge(collected.badge),
    game: new Game(collected.game),
    collectedAt: collected.collectedAt
  }) : null;
};

const addCollected = async (collected: Collected): Promise<void> => {
  await prisma.collected.create({
    data: {
      userId: collected.getUser().getId()!,
      badgeId: collected.getBadge().getId()!,
      gameId: collected.getGame().getId()!,
      collectedAt: collected.getCollectedAt(),
    },
  });
};

export default { getAllCollected, getCollectedById, addCollected };