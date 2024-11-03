import { Badge } from '../../model/badge';

describe('Badge', () => {
    it('should create a badge and return properties', () => {
        const badge = new Badge({ name: 'Achievement', description: 'Unlocked achievement', image: 'badge.png' });
        expect(badge.getName()).toBe('Achievement');
        expect(badge.getDescription()).toBe('Unlocked achievement');
        expect(badge.getImage()).toBe('badge.png');
    });

    it('should check equality of badges', () => {
        const badge1 = new Badge({ name: 'Achievement', description: 'Unlocked achievement', image: 'badge.png' });
        const badge2 = new Badge({ name: 'Achievement', description: 'Unlocked achievement', image: 'badge.png' });
        expect(badge1.equals(badge2)).toBe(true);
    });

    it('should return false for unequal badges', () => {
        const badge1 = new Badge({ name: 'Achievement', description: 'Unlocked achievement', image: 'badge.png' });
        const badge2 = new Badge({ name: 'Reward', description: 'Got reward', image: 'reward.png' });
        expect(badge1.equals(badge2)).toBe(false);
    });
});
