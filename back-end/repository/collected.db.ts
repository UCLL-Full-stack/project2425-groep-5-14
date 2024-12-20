import { PrismaClient } from '@prisma/client';
import { Collected } from '../model/collected';
import { User } from '../model/user';
import { Game } from '../model/game';
import { Badge } from '../model/badge';

const prisma = new PrismaClient();

const getAllCollected = async (): Promise<Collected[]> => {
  const collectedItems = await prisma.collected.findMany({
    include: {
      user: true,
      badge: true,
      game: true,
    },
  });
  return collectedItems.map((collected: any) => new Collected({
    ...collected,
    user: new User(collected.user.id, collected.user.username, collected.user.password, collected.user.avatar, collected.user.role),
    badge: collected.badge ? new Badge(collected.badge) : undefined,
    game: collected.game ? new Game(collected.game) : undefined,
    collectedAt: collected.collectedAt,
  }));
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
    user: new User(collected.user.username, collected.user.password, collected.user.avatar, collected.user.role, collected.user.id),
    badge: collected.badge ? new Badge(collected.badge) : undefined,
    game: collected.game ? new Game(collected.game) : undefined,
    collectedAt: collected.collectedAt,
  }) : null;
};

const addCollected = async (collected: Collected): Promise<void> => {
  await prisma.collected.create({
    data: {
      userId: collected.getUser().getId()!,
      gameId: collected.getGame()?.getId() ?? null, // Use nullish coalescing
      badgeId: collected.getBadge()?.getId() ?? null, // Use nullish coalescing
      collectedAt: collected.getCollectedAt(),
    },
  });
};

const getCollectedGamesByUserId = async (userId: number): Promise<Collected[]> => {
  const collectedItems = await prisma.collected.findMany({
    where: { userId },
    include: {
      game: true,
      user: true,
    },
  });

  return collectedItems.map((collected: any) => {
    console.log('Collected item user:', collected.user);
    return new Collected({
      ...collected,
      game: collected.game ? new Game(collected.game) : undefined,
      user: new User(collected.user.id, collected.user.username, collected.user.password, collected.user.avatar, collected.user.role),
      collectedAt: collected.collectedAt
    });
  });
};

const getCollectedBadgesByUserId = async (userId: number): Promise<Collected[]> => {
  const collectedItems = await prisma.collected.findMany({
    where: { userId },
    include: {
      badge: true,
      user: true,
    },
  });

  return collectedItems.map((collected: any) => {
    console.log('Collected item user:', collected.user);
    return new Collected({
      ...collected,
      badge: collected.badge ? new Badge(collected.badge) : undefined,
      user: new User(collected.user.username, collected.user.password, collected.user.avatar, collected.user.role, collected.user.id),
      collectedAt: collected.collectedAt
    });
  });
};

export default { getAllCollected, getCollectedById, addCollected, getCollectedGamesByUserId, getCollectedBadgesByUserId };