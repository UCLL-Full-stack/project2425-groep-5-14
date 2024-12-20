import { Collected } from '../model/collected';
import collectedDB from '../repository/collected.db';
import gameDB from '../repository/game.db';
import userDB from '../repository/user.db';
import { Game } from '../model/game';
import { Badge } from '../model/badge';

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
      collectedAt: collectedData.collectedAt,
    });
    await collectedDB.addCollected(collected);
  };

  const getCollectedGamesByUsername = async (username: string): Promise<Game[]> => {
    console.log(`Fetching user by username: ${username}`);
    const user = await userDB.getUserByUsername(username);

    if (!user) {
        console.warn(`User with username ${username} does not exist.`);
        throw new Error(`User with username ${username} does not exist.`);
    }

    try {
        console.log(`Fetching collected games for user ID: ${user.getId()}`);
        const collectedGames = await collectedDB.getCollectedGamesByUserId(user.getId()!);
        console.log(`Collected games for user ID ${user.getId()} retrieved successfully`);
        return collectedGames.map((collected: Collected) => collected.getGame()).filter((game: Game | undefined): game is Game => game !== undefined);
    } catch (error) {
        console.error(`Error fetching collected games for user ${username}:`, error);
        throw new Error('Failed to fetch collected games');
    }
};

const getCollectedBadgesByUsername = async (username: string): Promise<Badge[]> => {
  console.log(`Fetching user by username: ${username}`);
  const user = await userDB.getUserByUsername(username);

  if (!user) {
      console.warn(`User with username ${username} does not exist.`);
      throw new Error(`User with username ${username} does not exist.`);
  }

  try {
      console.log(`Fetching collected badges for user ID: ${user.getId()}`);
      const collectedBadges = await collectedDB.getCollectedBadgesByUserId(user.getId()!);
      console.log(`Collected badges for user ID ${user.getId()} retrieved successfully`);
      return collectedBadges.map(collected => collected.getBadge()).filter((badge): badge is Badge => badge !== undefined);
  } catch (error) {
      console.error(`Error fetching collected badges for user ${username}:`, error);
      throw new Error('Failed to fetch collected badges');
  }
};

// collected.service.ts
const collectGame = async (username: string, gameId: number): Promise<Collected | null> => {
  console.log(`Fetching user by username: ${username}`);
  const user = await userDB.getUserByUsername(username);

  if (!user) {
      console.warn(`User with username ${username} does not exist.`);
      throw new Error(`User with username ${username} does not exist.`);
  }

  console.log(`Fetching game by ID: ${gameId}`);
  const game = await gameDB.getGameById(gameId);

  if (!game) {
      console.warn(`Game with ID ${gameId} does not exist.`);
      throw new Error(`Game with ID ${gameId} does not exist.`);
  }

  try {
      console.log(`Collecting game for user ID: ${user.getId()}`);
      const collected = new Collected({
          user: user,
          game: game,
          collectedAt: new Date()
      });
      await collectedDB.addCollected(collected);
      console.log(`Game collected for user ID ${user.getId()} successfully`);
      return collected;
  } catch (error) {
      console.error(`Error collecting game for user ${username}:`, error);
      throw new Error('Failed to collect game');
  }
};


export default { getAllCollected, getCollectedById, createCollected, getCollectedGamesByUsername, getCollectedBadgesByUsername, collectGame };