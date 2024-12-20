import { Collected } from '../../model/collected';
import { Game } from '../../model/game';
import { User } from '../../model/user';
import { Badge } from '../../model/badge';
import collectedDB from '../../repository/collected.db';
import collectedService from '../../service/collected.service';
import { Password } from '@mui/icons-material';

jest.mock('../../repository/collected.db');

describe('Collected Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCollected', () => {
    it('should return all collected items', async () => {
      const collectedItems = [
        new Collected({
          user: new User('user1', 'pass', 'avatar.png', 'user'),
          game: new Game({ title: 'Game1', genre: 'Action', description: 'Desc1', image: 'img1.png', releaseDate: new Date() }),
          badge: new Badge({ name: 'Badge1', description: 'Desc1', image: 'img1.png' }),
          collectedAt: new Date(),
        }),
      ];
      (collectedDB.getAllCollected as jest.Mock).mockResolvedValue(collectedItems);

      const result = await collectedService.getAllCollected();
      expect(result).toEqual(collectedItems);
    });
  });

  describe('getCollectedById', () => {
    it('should return the collected item with the given id', async () => {
      const collectedItem = new Collected({
        user: new User('user1', 'pass', 'avatar.png', 'user'),
        game: new Game({ title: 'Game1', genre: 'Action', description: 'Desc1', image: 'img1.png', releaseDate: new Date() }),
        badge: new Badge({ name: 'Badge1', description: 'Desc1', image: 'img1.png' }),
        collectedAt: new Date(),
      });
      (collectedDB.getCollectedById as jest.Mock).mockResolvedValue(collectedItem);

      const result = await collectedService.getCollectedById(1);
      expect(result).toEqual(collectedItem);
    });

    it('should return null if the collected item is not found', async () => {
      (collectedDB.getCollectedById as jest.Mock).mockResolvedValue(null);

      const result = await collectedService.getCollectedById(1);
      expect(result).toBeNull();
    });
  });
});