import { PrismaClient } from '@prisma/client';
import { Reaction } from '../model/reaction';
import { User } from '../model/user';
import { Game } from '../model/game';

const prisma = new PrismaClient();

const getAllReactions = async (): Promise<Reaction[]> => {
  const reactions = await prisma.reaction.findMany();
  return reactions.map((reaction: any) => new Reaction(reaction));
};

const getReactionById = async (id: number): Promise<Reaction | null> => {
  const reaction = await prisma.reaction.findUnique({
    where: { id },
    include: {
      user: true,
      game: true,
    },
  });
  return reaction ? new Reaction({
    ...reaction,
    user: new User(reaction.user),
    game: new Game(reaction.game)
  }) : null;
};

const addReaction = async (reaction: Reaction): Promise<void> => {
  await prisma.reaction.create({
    data: {
      userId: reaction.getUser().getId()!,
      gameId: reaction.getGame().getId()!,
      content: reaction.getContent(),
      createdAt: reaction.getCreatedAt(),
    },
  });
};

export default { getAllReactions, getReactionById, addReaction };