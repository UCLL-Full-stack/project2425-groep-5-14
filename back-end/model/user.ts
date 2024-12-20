import { Badge } from "./badge";
import { Role } from "../types";
import bcrypt from "bcrypt";

export class User {
    private id?: number;
    private username: string;
    private password: string;
    private avatar: string;
    private badges: Badge[] = [];
    private role: Role;

    constructor(username: string, password: string, avatar: string, role: Role, id?: number) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.avatar = avatar;
        this.role = role;
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

    async setPassword(password: string): Promise<void> {
        this.password = await bcrypt.hash(password, 10);
    }
    
    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}
