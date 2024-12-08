import { Game } from '../model/game';
import gameDB from '../repository/game.db';

const getAllGames = async (): Promise<Game[]> => {
  return await gameDB.getAllGames();
};

const getGameById = async (id: number): Promise<Game | null> => {
  return await gameDB.getGameById(id);
};

const createGame = async (gameData: { title: string; genre: string; description: string; image: string; releaseDate: Date }): Promise<void> => {
  const game = new Game(gameData);
  await gameDB.addGame(game);
};

export default { getAllGames, getGameById, createGame };