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

const addGame = async (game: Game): Promise<void> => {
  await prisma.game.create({
    data: {
      title: game.getTitle(),
      genre: game.getGenre(),
      description: game.getDescription(),
      image: game.getImage(),
      releaseDate: game.getReleaseDate(),
    },
  });
};

export default { getAllGames, getGameById, addGame };