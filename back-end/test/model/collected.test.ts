import { User } from '../../model/user';
import { Game } from '../../model/game';
import { Badge } from '../../model/badge';
import { Collected } from '../../model/collected';
import { collectedService } from '../../service/collected.service';
import { Role } from '../../types'; // Adjust the import according to your project structure

describe('Collected', () => {
    it('should create a collected game entry and return properties', () => {
        const game = new Game({ title: 'GameTitle', genre: 'Action', description: 'Fun game', image: 'image.png' });
        const user = new User({ username: 'testUser', password: 'pass123', avatar: 'avatar.png', role: 'student' });
        const collected = new Collected({ game, user, collectedAt: new Date('2024-01-01') });
        expect(collected.getGame()).toBe(game);
        expect(collected.getUser()).toBe(user);
        expect(collected.getCollectedAt()).toEqual(new Date('2024-01-01'));
    });

    it('should create a collected badge entry and return properties', () => {
        const badge = new Badge({ title: 'BadgeTitle', description: 'Achieved badge', image: 'badge.png' });
        const user = new User({ username: 'testUser', password: 'pass123', avatar: 'avatar.png', role: 'student' });
        const collected = new Collected({ badge, user, collectedAt: new Date('2024-01-01') });
        expect(collected.getBadge()).toBe(badge);
        expect(collected.getUser()).toBe(user);
        expect(collected.getCollectedAt()).toEqual(new Date('2024-01-01'));
    });

    it('should check equality of collected game entries', () => {
        const game = new Game({ title: 'GameTitle', genre: 'Action', description: 'Fun game', image: 'image.png' });
        const user = new User({ username: 'testUser', password: 'pass123', avatar: 'avatar.png', role: 'student' });
        const collected1 = new Collected({ game, user, collectedAt: new Date('2024-01-01') });
        const collected2 = new Collected({ game, user, collectedAt: new Date('2024-01-01') });
        expect(collected1.equals(collected2)).toBe(true);
    });

    it('should check equality of collected badge entries', () => {
        const badge = new Badge({ title: 'BadgeTitle', description: 'Achieved badge', image: 'badge.png' });
        const user = new User({ username: 'testUser', password: 'pass123', avatar: 'avatar.png', role: 'student' });
        const collected1 = new Collected({ badge, user, collectedAt: new Date('2024-01-01') });
        const collected2 = new Collected({ badge, user, collectedAt: new Date('2024-01-01') });
        expect(collected1.equals(collected2)).toBe(true);
    });

    it('should return false for unequal collected game entries', () => {
        const game1 = new Game({ title: 'GameTitle', genre: 'Action', description: 'Fun game', image: 'image.png' });
        const game2 = new Game({ title: 'AnotherGame', genre: 'Puzzle', description: 'Puzzle game', image: 'image2.png' });
        const user = new User({ username: 'testUser', password: 'pass123', avatar: 'avatar.png', role: 'student' });
        const collected1 = new Collected({ game: game1, user, collectedAt: new Date('2024-01-01') });
        const collected2 = new Collected({ game: game2, user, collectedAt: new Date('2024-01-01') });
        expect(collected1.equals(collected2)).toBe(false);
    });

    it('should return false for unequal collected badge entries', () => {
        const badge1 = new Badge({ title: 'BadgeTitle', description: 'Achieved badge', image: 'badge.png' });
        const badge2 = new Badge({ title: 'AnotherBadge', description: 'Another badge', image: 'badge2.png' });
        const user = new User({ username: 'testUser', password: 'pass123', avatar: 'avatar.png', role: 'student' });
        const collected1 = new Collected({ badge: badge1, user, collectedAt: new Date('2024-01-01') });
        const collected2 = new Collected({ badge: badge2, user, collectedAt: new Date('2024-01-01') });
        expect(collected1.equals(collected2)).toBe(false);
    });

    it('should collect a game for a user', async () => {
        const username = 'testUser';
        const gameId = 'game123';
        const collectedGame = await collectedService.collectGame(username, gameId);
        expect(collectedGame).toBeDefined();
        expect(collectedGame.getUser().getUsername()).toBe(username);
        expect(collectedGame.getGame().getId()).toBe(gameId);
    });
});