import { Game } from '../../model/game';

describe('Game', () => {
    it('should create a game and return properties', () => {
        const game = new Game({ title: 'GameTitle', genre: 'Action', description: 'Fun game', image: 'image.png' });
        expect(game.getTitle()).toBe('GameTitle');
        expect(game.getGenre()).toBe('Action');
        expect(game.getDescription()).toBe('Fun game');
        expect(game.getImage()).toBe('image.png');
    });

    it('should check equality of games', () => {
        const game1 = new Game({ title: 'GameTitle', genre: 'Action', description: 'Fun game', image: 'image.png' });
        const game2 = new Game({ title: 'GameTitle', genre: 'Action', description: 'Fun game', image: 'image.png' });
        expect(game1.equals(game2)).toBe(true);
    });

    it('should return false for unequal games', () => {
        const game1 = new Game({ title: 'GameTitle', genre: 'Action', description: 'Fun game', image: 'image.png' });
        const game2 = new Game({ title: 'AnotherGame', genre: 'Puzzle', description: 'Puzzle game', image: 'image2.png' });
        expect(game1.equals(game2)).toBe(false);
    });
});
