import { PrismaClient } from '@prisma/client';
import { Badge } from '../model/badge';

const prisma = new PrismaClient();

const getAllBadges = async (): Promise<Badge[]> => {
  const badges = await prisma.badge.findMany();
  return badges.map((badge: any) => new Badge(badge));
};

const getBadgeById = async (id: number): Promise<Badge | null> => {
  const badge = await prisma.badge.findUnique({
    where: { id },
  });
  return badge ? new Badge(badge) : null;
};

const addBadge = async (badge: Badge): Promise<void> => {
  await prisma.badge.create({
    data: {
      name: badge.getName(),
      description: badge.getDescription(),
      image: badge.getImage(),
    },
  });
};

export default { getAllBadges, getBadgeById, addBadge };