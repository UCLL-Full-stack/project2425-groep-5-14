import { Game } from './game';
import { User } from './user';
import { Badge } from './badge';
import { th } from 'date-fns/locale';

export class Collected {
    private game: Game;
    private bage: Badge;
    private user: User;
    private collectedAt: Date;

    constructor(collected: { game: Game; user: User; badge: Badge; collectedAt: Date }) {
        this.game = collected.game;
        this.bage = collected.badge;
        this.user = collected.user;
        this.collectedAt = collected.collectedAt;
    }

    getGame(): Game {
        return this.game;
    }

    getBadge(): Badge {
        return this.bage;
    }

    getUser(): User {
        return this.user;
    }

    getCollectedAt(): Date {
        return this.collectedAt;
    }

    equals(collected: Collected): boolean {
        return (
            this.game.equals(collected.getGame()) &&
            this.user.equals(collected.getUser()) &&
            this.collectedAt === collected.getCollectedAt() &&
            this.bage.equals(collected.getBadge())
        );
    }
}
