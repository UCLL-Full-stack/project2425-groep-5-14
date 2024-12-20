import { Game } from './game';
import { User } from './user';
import { Badge } from './badge';
import { th } from 'date-fns/locale';

export class Collected {
    private game?: Game;
    private badge?: Badge;
    private user: User;
    private collectedAt: Date;

    constructor(collected: { game?: Game; user: User; badge?: Badge; collectedAt: Date }) {
        this.game = collected.game;
        this.badge = collected.badge;
        this.user = collected.user;
        this.collectedAt = collected.collectedAt;
    }

    getGame(): Game | undefined {
        return this.game;
    }

    getBadge(): Badge | undefined {
        return this.badge;
    }

    getUser(): User {
        return this.user;
    }

    getCollectedAt(): Date {
        return this.collectedAt;
    }

    equals(collected: Collected): boolean {
        return (
            (this.game ? this.game.equals(collected.getGame()!) : collected.getGame() === undefined) &&
            this.user.equals(collected.getUser()) &&
            this.collectedAt === collected.getCollectedAt() &&
            (this.badge ? this.badge.equals(collected.getBadge()!) : collected.getBadge() === undefined)
        );
    }
}
