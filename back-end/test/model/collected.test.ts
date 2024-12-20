import { Collected } from '../../model/collected';
import { Game } from '../../model/game';
import { User } from '../../model/user';
import { Badge } from '../../model/badge';

describe('Collected', () => {
  let game: Game;
  let user: User;
  let badge: Badge;
  let collectedData: { game?: Game; user: User; badge?: Badge; collectedAt: Date };

  beforeEach(() => {
    game = new Game({ id: 1, title: 'Test Game', genre: 'Action', description: 'A test game', image: 'test-game.png', releaseDate: new Date('2023-01-01') });
    user = new User( 'testuser', 'password', 'avatar.png', 'user' );
    badge = new Badge({ id: 1, name: 'Test Badge', description: 'A test badge', image: 'test-badge.png' });
    collectedData = {
      game,
      user,
      badge,
      collectedAt: new Date('2023-01-01T00:00:00Z'),
    };
  });

  describe('constructor', () => {
    it('should create a collected instance with the given data', () => {
      const collected = new Collected(collectedData);

      expect(collected.getGame()).toBe(collectedData.game);
      expect(collected.getUser()).toBe(collectedData.user);
      expect(collected.getBadge()).toBe(collectedData.badge);
      expect(collected.getCollectedAt()).toEqual(collectedData.collectedAt);
    });

    it('should create a collected instance without a game', () => {
      const { game, ...dataWithoutGame } = collectedData;
      const collected = new Collected(dataWithoutGame);

      expect(collected.getGame()).toBeUndefined();
      expect(collected.getUser()).toBe(dataWithoutGame.user);
      expect(collected.getBadge()).toBe(dataWithoutGame.badge);
      expect(collected.getCollectedAt()).toEqual(dataWithoutGame.collectedAt);
    });

    it('should create a collected instance without a badge', () => {
      const { badge, ...dataWithoutBadge } = collectedData;
      const collected = new Collected(dataWithoutBadge);

      expect(collected.getGame()).toBe(dataWithoutBadge.game);
      expect(collected.getUser()).toBe(dataWithoutBadge.user);
      expect(collected.getBadge()).toBeUndefined();
      expect(collected.getCollectedAt()).toEqual(dataWithoutBadge.collectedAt);
    });
  });

  describe('getters', () => {
    let collected: Collected;

    beforeEach(() => {
      collected = new Collected(collectedData);
    });

    it('should return the game', () => {
      expect(collected.getGame()).toBe(collectedData.game);
    });

    it('should return the user', () => {
      expect(collected.getUser()).toBe(collectedData.user);
    });

    it('should return the badge', () => {
      expect(collected.getBadge()).toBe(collectedData.badge);
    });

    it('should return the collectedAt date', () => {
      expect(collected.getCollectedAt()).toEqual(collectedData.collectedAt);
    });
  });

  describe('equals', () => {
    let collected1: Collected;
    let collected2: Collected;

    beforeEach(() => {
      collected1 = new Collected(collectedData);
      collected2 = new Collected(collectedData);
    });

    it('should return true for collected instances with the same data', () => {
      expect(collected1.equals(collected2)).toBe(true);
    });

    it('should return false for collected instances with different games', () => {
      const differentGame = new Game({ id: 2, title: 'Different Game', genre: 'Adventure', description: 'A different game', image: 'different-game.png', releaseDate: new Date('2023-02-01') });
      const differentCollected = new Collected({ ...collectedData, game: differentGame });
      expect(collected1.equals(differentCollected)).toBe(false);
    });

    it('should return false for collected instances with different users', () => {
      const differentUser = new User('differentuser', 'password', 'avatar.png', 'user' );
      const differentCollected = new Collected({ ...collectedData, user: differentUser });
      expect(collected1.equals(differentCollected)).toBe(false);
    });

    it('should return false for collected instances with different badges', () => {
      const differentBadge = new Badge({ id: 2, name: 'Different Badge', description: 'A different badge', image: 'different-badge.png' });
      const differentCollected = new Collected({ ...collectedData, badge: differentBadge });
      expect(collected1.equals(differentCollected)).toBe(false);
    });

    it('should return false for collected instances with different collectedAt dates', () => {
      const differentCollected = new Collected({ ...collectedData, collectedAt: new Date('2023-02-01T00:00:00Z') });
      expect(collected1.equals(differentCollected)).toBe(false);
    });
  });
});