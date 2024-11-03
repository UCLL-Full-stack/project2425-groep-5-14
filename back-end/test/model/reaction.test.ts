import { Reaction } from '../../model/reaction';
import { Game } from '../../model/game';
import { User } from '../../model/user';
import { Role } from '../../types'; // Adjust the import according to your project structure

describe('Reaction', () => {
    it('should create a reaction and return properties', () => {
        const game = new Game({ title: 'GameTitle', genre: 'Action', description: 'Fun game', image: 'image.png' });
        const user = new User({ username: 'testUser', password: 'pass123', avatar: 'avatar.png', role: 'student' }); // Add role
        const reaction = new Reaction({ game, user, content: 'Great game!' });
        expect(reaction.getGame()).toBe(game);
        expect(reaction.getUser()).toBe(user);
        expect(reaction.getContent()).toBe('Great game!');
    });

    it('should check equality of reactions', () => {
        const game = new Game({ title: 'GameTitle', genre: 'Action', description: 'Fun game', image: 'image.png' });
        const user = new User({ username: 'testUser', password: 'pass123', avatar: 'avatar.png', role: 'student' }); // Add role
        const reaction1 = new Reaction({ game, user, content: 'Great game!' });
        const reaction2 = new Reaction({ game, user, content: 'Great game!' });
        expect(reaction1.equals(reaction2)).toBe(true);
    });

    it('should return false for unequal reactions', () => {
        const game = new Game({ title: 'GameTitle', genre: 'Action', description: 'Fun game', image: 'image.png' });
        const user = new User({ username: 'testUser', password: 'pass123', avatar: 'avatar.png', role: 'student' }); // Add role
        const reaction1 = new Reaction({ game, user, content: 'Great game!' });
        const reaction2 = new Reaction({ game, user, content: 'Not so great!' });
        expect(reaction1.equals(reaction2)).toBe(false);
    });
});
