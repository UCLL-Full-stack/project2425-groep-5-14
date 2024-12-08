import { Collected } from '../model/collected';
import collectedDB from '../repository/collected.db';

const getAllCollected = async (): Promise<Collected[]> => {
  return await collectedDB.getAllCollected();
};

const getCollectedById = async (id: number): Promise<Collected | null> => {
  return await collectedDB.getCollectedById(id);
};

const createCollected = async (collectedData: { userId: number; badgeId: number; gameId: number; collectedAt: Date }): Promise<void> => {
    const collected = new Collected({
      user: { id: collectedData.userId } as any,
      badge: { id: collectedData.badgeId } as any,
      game: { id: collectedData.gameId } as any,
      date: collectedData.collectedAt,
    });
    await collectedDB.addCollected(collected);
  };

export default { getAllCollected, getCollectedById, createCollected };