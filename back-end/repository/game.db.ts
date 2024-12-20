import { PrismaClient } from '@prisma/client';
import { Game } from '../model/game';

const prisma = new PrismaClient();

const getAllGames = async (): Promise<Game[]> => {
  const games = await prisma.game.findMany();
  return games.map((game: any) => new Game(game));
};

const getGameById = async (id: number): Promise<Game | null> => {
  const game = await prisma.game.findUnique({
    where: { id },
  });
  return game ? new Game(game) : null;
};

// const addGame = async (game: Game): Promise<void> => {
//   await prisma.game.create({
//     data: {
//       title: game.getTitle(),
//       genre: game.getGenre(),
//       description: game.getDescription(),
//       image: game.getImage(),
//       releaseDate: game.getReleaseDate(),
//     },
//   });
// };

const deleteGameByTitle = async (title: string): Promise<void> => {
  try {
    const game = await prisma.game.findUnique({
      where: { title },
    });

    if (!game) {
      throw new Error(`Game with title "${title}" does not exist`);
    }

    // Delete related records in the Reaction table
    await prisma.reaction.deleteMany({
      where: { gameId: game.id },
    });

    // Delete the game
    await prisma.game.delete({
      where: { id: game.id },
    });

    console.log(`Game with title "${title}" deleted successfully`);
  } catch (error) {
    console.error(`Error deleting game with title "${title}":`, error);
    throw error;
  }
};

const addGame = async (game: Game): Promise<void> => {
  try {
    await prisma.game.create({
      data: {
        title: game.getTitle(),
        genre: game.getGenre(),
        description: game.getDescription(),
        image: game.getImage(),
        releaseDate: game.getReleaseDate(),
      },
    });
    console.log(`Game with title "${game.getTitle()}" added successfully`);
  } catch (error) {
    console.error(`Error adding game with title "${game.getTitle()}":`, error);
    throw error;
  }
};

export default { getAllGames, getGameById, addGame, deleteGameByTitle };