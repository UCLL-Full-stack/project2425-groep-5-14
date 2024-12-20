import badgeService from '../../service/badge.service';
import badgeDB from '../../repository/badge.db';
import { Badge } from '../../model/badge';

jest.mock('../../repository/badge.db');

describe('Badge Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBadges', () => {
    it('should return all badges', async () => {
      const badges = [new Badge({ name: 'Badge1', description: 'Desc1', image: 'img1.png' })];
      (badgeDB.getAllBadges as jest.Mock).mockResolvedValue(badges);

      const result = await badgeService.getAllBadges();
      expect(result).toEqual(badges);
    });
  });

  describe('getBadgeById', () => {
    it('should return the badge with the given id', async () => {
      const badge = new Badge({ name: 'Badge1', description: 'Desc1', image: 'img1.png' });
      (badgeDB.getBadgeById as jest.Mock).mockResolvedValue(badge);

      const result = await badgeService.getBadgeById(1);
      expect(result).toEqual(badge);
    });

    it('should return null if the badge is not found', async () => {
      (badgeDB.getBadgeById as jest.Mock).mockResolvedValue(null);

      const result = await badgeService.getBadgeById(1);
      expect(result).toBeNull();
    });
  });

  describe('createBadge', () => {
    it('should create a new badge', async () => {
      const badgeData = { name: 'Badge1', description: 'Desc1', image: 'img1.png' };
      const badge = new Badge(badgeData);
      (badgeDB.addBadge as jest.Mock).mockResolvedValue(badge);

      await badgeService.createBadge(badgeData);
      expect(badgeDB.addBadge).toHaveBeenCalledWith(expect.any(Badge));
    });
  });
});