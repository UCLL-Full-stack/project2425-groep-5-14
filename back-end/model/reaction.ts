import { Game } from './game';
import { User } from './user';

export class Reaction {
    private id?: number;
    private game: Game;
    private user: User;
    private content: string;

    constructor(reaction: { id?: number; game: Game; user: User; content: string }) {
        this.id = reaction.id;
        this.game = reaction.game;
        this.user = reaction.user;
        this.content = reaction.content;
    }

    getId(): number | undefined {
        return this.id;
    }

    getGame(): Game {
        return this.game;
    }

    getUser(): User {
        return this.user;
    }

    getContent(): string {
        return this.content;
    }

    equals(reaction: Reaction): boolean {
        return (
            this.game.equals(reaction.getGame()) &&
            this.user.equals(reaction.getUser()) &&
            this.content === reaction.getContent()
        );
    }
}
