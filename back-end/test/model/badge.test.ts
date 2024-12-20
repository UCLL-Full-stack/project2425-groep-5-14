import { Badge } from '../../model/badge';

describe('Badge', () => {
  let badgeData: { id?: number; name: string; description: string; image: string };

  beforeEach(() => {
    badgeData = {
      id: 1,
      name: 'Test Badge',
      description: 'This is a test badge',
      image: 'test-badge.png',
    };
  });

  describe('constructor', () => {
    it('should create a badge with the given data', () => {
      const badge = new Badge(badgeData);

      expect(badge.getId()).toBe(badgeData.id);
      expect(badge.getName()).toBe(badgeData.name);
      expect(badge.getDescription()).toBe(badgeData.description);
      expect(badge.getImage()).toBe(badgeData.image);
    });

    it('should create a badge without an id', () => {
      const { id, ...dataWithoutId } = badgeData;
      const badge = new Badge(dataWithoutId);

      expect(badge.getId()).toBeUndefined();
      expect(badge.getName()).toBe(dataWithoutId.name);
      expect(badge.getDescription()).toBe(dataWithoutId.description);
      expect(badge.getImage()).toBe(dataWithoutId.image);
    });
  });

  describe('getters', () => {
    let badge: Badge;

    beforeEach(() => {
      badge = new Badge(badgeData);
    });

    it('should return the id', () => {
      expect(badge.getId()).toBe(badgeData.id);
    });

    it('should return the name', () => {
      expect(badge.getName()).toBe(badgeData.name);
    });

    it('should return the description', () => {
      expect(badge.getDescription()).toBe(badgeData.description);
    });

    it('should return the image', () => {
      expect(badge.getImage()).toBe(badgeData.image);
    });
  });

  describe('equals', () => {
    let badge1: Badge;
    let badge2: Badge;

    beforeEach(() => {
      badge1 = new Badge(badgeData);
      badge2 = new Badge(badgeData);
    });

    it('should return true for badges with the same data', () => {
      expect(badge1.equals(badge2)).toBe(true);
    });

    it('should return false for badges with different names', () => {
      const differentBadge = new Badge({ ...badgeData, name: 'Different Badge' });
      expect(badge1.equals(differentBadge)).toBe(false);
    });

    it('should return false for badges with different descriptions', () => {
      const differentBadge = new Badge({ ...badgeData, description: 'Different description' });
      expect(badge1.equals(differentBadge)).toBe(false);
    });

    it('should return false for badges with different images', () => {
      const differentBadge = new Badge({ ...badgeData, image: 'different-image.png' });
      expect(badge1.equals(differentBadge)).toBe(false);
    });
  });
});