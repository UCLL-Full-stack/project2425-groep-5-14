import { Game } from './game';
import { User } from './user';

export class Collected {
    private game: Game;
    private user: User;
    private date: Date;

    constructor(collected: { game: Game; user: User; date: Date }) {
        this.game = collected.game;
        this.user = collected.user;
        this.date = collected.date;
    }

    getGame(): Game {
        return this.game;
    }

    getUser(): User {
        return this.user;
    }

    getDate(): Date {
        return this.date;
    }

    equals(collected: Collected): boolean {
        return (
            this.game.equals(collected.getGame()) &&
            this.user.equals(collected.getUser()) &&
            this.date.getTime() === collected.getDate().getTime()
        );
    }
}
