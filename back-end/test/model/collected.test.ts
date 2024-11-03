import { Collected } from '../../model/collected';
import { Game } from '../../model/game';
import { User } from '../../model/user';
import { Role } from '../../types'; // Adjust the import according to your project structure

describe('Collected', () => {
    it('should create a collected game entry and return properties', () => {
        const game = new Game({ title: 'GameTitle', genre: 'Action', description: 'Fun game', image: 'image.png' });
        const user = new User({ username: 'testUser', password: 'pass123', avatar: 'avatar.png', role: 'student' }); // Add role
        const collected = new Collected({ game, user, date: new Date('2024-01-01') });
        expect(collected.getGame()).toBe(game);
        expect(collected.getUser()).toBe(user);
        expect(collected.getDate()).toEqual(new Date('2024-01-01'));
    });

    it('should check equality of collected entries', () => {
        const game = new Game({ title: 'GameTitle', genre: 'Action', description: 'Fun game', image: 'image.png' });
        const user = new User({ username: 'testUser', password: 'pass123', avatar: 'avatar.png', role: 'student' }); // Add role
        const collected1 = new Collected({ game, user, date: new Date('2024-01-01') });
        const collected2 = new Collected({ game, user, date: new Date('2024-01-01') });
        expect(collected1.equals(collected2)).toBe(true);
    });

    it('should return false for unequal collected entries', () => {
        const game1 = new Game({ title: 'GameTitle', genre: 'Action', description: 'Fun game', image: 'image.png' });
        const game2 = new Game({ title: 'AnotherGame', genre: 'Puzzle', description: 'Puzzle game', image: 'image2.png' });
        const user = new User({ username: 'testUser', password: 'pass123', avatar: 'avatar.png', role: 'student' }); // Add role
        const collected1 = new Collected({ game: game1, user, date: new Date('2024-01-01') });
        const collected2 = new Collected({ game: game2, user, date: new Date('2024-01-01') });
        expect(collected1.equals(collected2)).toBe(false);
    });
});
