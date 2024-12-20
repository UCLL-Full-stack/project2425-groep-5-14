import reactionService from '../../service/reaction.service';
import reactionDB from '../../repository/reaction.db';
import userDB from '../../repository/user.db';
import gameDB from '../../repository/game.db';
import { Reaction } from '../../model/reaction';
import { User } from '../../model/user';
import { Game } from '../../model/game';
import { Role } from '../../types';

jest.mock('../../repository/reaction.db');
jest.mock('../../repository/user.db');
jest.mock('../../repository/game.db');

describe('Reaction Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllReactions', () => {
    it('should return all reactions', async () => {
      const reactions = [
        new Reaction({
          user: new User('user1', 'pass', 'avatar.png', 'user' as Role),
          game: new Game({ title: 'Game1', genre: 'Action', description: 'Desc1', image: 'img1.png', releaseDate: new Date() }),
          content: 'Great game!',
          createdAt: new Date(),
        }),
      ];
      (reactionDB.getAllReactions as jest.Mock).mockResolvedValue(reactions);

      const result = await reactionService.getAllReactions();
      expect(result).toEqual(reactions);
    });
  });

  describe('getReactionById', () => {
    it('should return the reaction with the given id', async () => {
      const reaction = new Reaction({
        user: new User('user1', 'pass', 'avatar.png', 'user' as Role),
        game: new Game({ title: 'Game1', genre: 'Action', description: 'Desc1', image: 'img1.png', releaseDate: new Date() }),
        content: 'Great game!',
        createdAt: new Date(),
      });
      (reactionDB.getReactionById as jest.Mock).mockResolvedValue(reaction);

      const result = await reactionService.getReactionById(1);
      expect(result).toEqual(reaction);
    });

    it('should return null if the reaction is not found', async () => {
      (reactionDB.getReactionById as jest.Mock).mockResolvedValue(null);

      const result = await reactionService.getReactionById(1);
      expect(result).toBeNull();
    });
  });

});