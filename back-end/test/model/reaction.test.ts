import { Reaction } from '../../model/reaction';
import { Game } from '../../model/game';
import { User } from '../../model/user';
import { Role } from '../../types';

describe('Reaction', () => {
  let game: Game;
  let user: User;
  let reactionData: { id?: number; game: Game; user: User; content: string; createdAt: Date };

  beforeEach(() => {
    game = new Game({ id: 1, title: 'GameTitle', genre: 'Action', description: 'Fun game', image: 'image.png', releaseDate: new Date('2023-01-01') });
    user = new User('testUser', 'pass123', 'avatar.png', 'student' as Role );
    reactionData = {
      id: 1,
      game,
      user,
      content: 'Great game!',
      createdAt: new Date('2023-01-01T00:00:00Z'),
    };
  });

  describe('constructor', () => {
    it('should create a reaction with the given data', () => {
      const reaction = new Reaction(reactionData);

      expect(reaction.getId()).toBe(reactionData.id);
      expect(reaction.getGame()).toBe(reactionData.game);
      expect(reaction.getUser()).toBe(reactionData.user);
      expect(reaction.getContent()).toBe(reactionData.content);
      expect(reaction.getCreatedAt()).toEqual(reactionData.createdAt);
    });

    it('should create a reaction without an id', () => {
      const { id, ...dataWithoutId } = reactionData;
      const reaction = new Reaction(dataWithoutId);

      expect(reaction.getId()).toBeUndefined();
      expect(reaction.getGame()).toBe(dataWithoutId.game);
      expect(reaction.getUser()).toBe(dataWithoutId.user);
      expect(reaction.getContent()).toBe(dataWithoutId.content);
      expect(reaction.getCreatedAt()).toEqual(dataWithoutId.createdAt);
    });
  });

  describe('getters', () => {
    let reaction: Reaction;

    beforeEach(() => {
      reaction = new Reaction(reactionData);
    });

    it('should return the id', () => {
      expect(reaction.getId()).toBe(reactionData.id);
    });

    it('should return the game', () => {
      expect(reaction.getGame()).toBe(reactionData.game);
    });

    it('should return the user', () => {
      expect(reaction.getUser()).toBe(reactionData.user);
    });

    it('should return the content', () => {
      expect(reaction.getContent()).toBe(reactionData.content);
    });

    it('should return the createdAt date', () => {
      expect(reaction.getCreatedAt()).toEqual(reactionData.createdAt);
    });
  });

  describe('equals', () => {
    let reaction1: Reaction;
    let reaction2: Reaction;

    beforeEach(() => {
      reaction1 = new Reaction(reactionData);
      reaction2 = new Reaction(reactionData);
    });

    it('should return true for reactions with the same data', () => {
      expect(reaction1.equals(reaction2)).toBe(true);
    });

    it('should return false for reactions with different games', () => {
      const differentGame = new Game({ id: 2, title: 'Different Game', genre: 'Adventure', description: 'A different game', image: 'different-game.png', releaseDate: new Date('2023-02-01') });
      const differentReaction = new Reaction({ ...reactionData, game: differentGame });
      expect(reaction1.equals(differentReaction)).toBe(false);
    });

    it('should return false for reactions with different users', () => {
      const differentUser = new User('differentUser', 'pass123', 'avatar.png', 'student' as Role );
      const differentReaction = new Reaction({ ...reactionData, user: differentUser });
      expect(reaction1.equals(differentReaction)).toBe(false);
    });

    it('should return false for reactions with different content', () => {
      const differentReaction = new Reaction({ ...reactionData, content: 'Not so great!' });
      expect(reaction1.equals(differentReaction)).toBe(false);
    });

    it('should return false for reactions with different createdAt dates', () => {
      const differentReaction = new Reaction({ ...reactionData, createdAt: new Date('2023-02-01T00:00:00Z') });
      expect(reaction1.equals(differentReaction)).toBe(false);
    });
  });
});