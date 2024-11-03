import { Badge } from "./badge";
import { Role } from "../types";

export class User {
    private id?: number;
    private username: string;
    private password: string;
    private avatar: string;
    private badges: Badge[] = [];
    private role: Role;

    constructor(user: { id?: number; username: string; password: string; avatar: string; role: Role; badges?: Badge[] }) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.avatar = user.avatar;
        this.role = user.role;
        this.badges = user.badges || [];
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getAvatar(): string {
        return this.avatar;
    }

    getRole(): Role {
        return this.role;
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.password === user.getPassword() &&
            this.avatar === user.getAvatar() &&
            this.role === user.getRole()
        );
    }

    // Add method to assign badges to user
    addBadge(badge: Badge): void {
        if (!this.badges.some(b => b.equals(badge))) {
            this.badges.push(badge);
        }
    }

    // Add method to get badges
    getBadges(): Badge[] {
        return this.badges;
    }
}
