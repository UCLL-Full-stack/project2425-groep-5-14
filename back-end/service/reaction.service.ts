import { Reaction } from '../model/reaction';
import reactionDB from '../repository/reaction.db';
import userDB from '../repository/user.db';
import gameDB from '../repository/game.db';

const getAllReactions = async (): Promise<Reaction[]> => {
  return await reactionDB.getAllReactions();
};

const getReactionById = async (id: number): Promise<Reaction | null> => {
  return await reactionDB.getReactionById(id);
};

const createReaction = async (reactionData: { userId: number; gameId: number; badgeId: number; content: string; createdAt: Date }): Promise<void> => {
  const user = await userDB.getUserById(reactionData.userId);
  const game = await gameDB.getGameById(reactionData.gameId);
  if (!user) {
    throw new Error(`User with id ${reactionData.userId} not found`);
  }
  if (!game) {
    throw new Error(`Game with id ${reactionData.gameId} not found`);
  }
  const reaction = new Reaction({ ...reactionData, user, game });
  await reactionDB.addReaction(reaction);
};

export default { getAllReactions, getReactionById, createReaction };