import { Game } from './game';
import { User } from './user';

export class Reaction {
    private id?: number;
    private game: Game;
    private user: User;
    private content: string;
    private createdAt: Date;

    constructor(reaction: { id?: number; game: Game; user: User; content: string; createdAt: Date }) {
        this.id = reaction.id;
        this.game = reaction.game;
        this.user = reaction.user;
        this.content = reaction.content;
        this.createdAt = reaction.createdAt;
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

    getCreatedAt(): Date {
        return this.createdAt;
    }

    equals(reaction: Reaction): boolean {
        return (
            this.game.equals(reaction.getGame()) &&
            this.user.equals(reaction.getUser()) &&
            this.content === reaction.getContent() &&
            this.createdAt === reaction.getCreatedAt()
        );
    }
}
