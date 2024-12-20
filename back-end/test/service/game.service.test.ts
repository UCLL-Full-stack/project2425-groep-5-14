import gameService from '../../service/game.service';
import gameDB from '../../repository/game.db';
import { Game } from '../../model/game';

jest.mock('../../repository/game.db');

describe('Game Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllGames', () => {
    it('should return all games', async () => {
      const games = [new Game({ title: 'Game1', genre: 'Action', description: 'Desc1', image: 'img1.png', releaseDate: new Date() })];
      (gameDB.getAllGames as jest.Mock).mockResolvedValue(games);

      const result = await gameService.getAllGames();
      expect(result).toEqual(games);
    });
  });

  describe('getGameById', () => {
    it('should return the game with the given id', async () => {
      const game = new Game({ title: 'Game1', genre: 'Action', description: 'Desc1', image: 'img1.png', releaseDate: new Date() });
      (gameDB.getGameById as jest.Mock).mockResolvedValue(game);

      const result = await gameService.getGameById(1);
      expect(result).toEqual(game);
    });

    it('should return null if the game is not found', async () => {
      (gameDB.getGameById as jest.Mock).mockResolvedValue(null);

      const result = await gameService.getGameById(1);
      expect(result).toBeNull();
    });
  });

  describe('createGame', () => {
    it('should create a new game', async () => {
      const gameData = { title: 'Game1', genre: 'Action', description: 'Desc1', image: 'img1.png', releaseDate: new Date() };
      const game = new Game(gameData);
      (gameDB.addGame as jest.Mock).mockResolvedValue(game);

      await gameService.createGame(gameData);
      expect(gameDB.addGame).toHaveBeenCalledWith(expect.any(Game));
    });
  });

  describe('deleteGameByTitle', () => {
    it('should delete the game with the given title', async () => {
      (gameDB.deleteGameByTitle as jest.Mock).mockResolvedValue(undefined);

      await gameService.deleteGameByTitle('Game1');
      expect(gameDB.deleteGameByTitle).toHaveBeenCalledWith('Game1');
    });
  });
});