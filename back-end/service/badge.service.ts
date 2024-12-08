import { Badge } from '../model/badge';
import badgeDB from '../repository/badge.db';

const getAllBadges = async (): Promise<Badge[]> => {
  return await badgeDB.getAllBadges();
};

const getBadgeById = async (id: number): Promise<Badge | null> => {
  return await badgeDB.getBadgeById(id);
};

const createBadge = async (badgeData: { name: string; description: string; image: string }): Promise<void> => {
  const badge = new Badge(badgeData);
  await badgeDB.addBadge(badge);
};

export default { getAllBadges, getBadgeById, createBadge };