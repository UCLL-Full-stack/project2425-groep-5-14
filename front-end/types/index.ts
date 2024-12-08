export interface Game {
    id: number;
    title: string;
    genre: string;
    description: string;
    image: string;
    releaseDate: Date;
}

export interface User {
    id?: number;
    username: string;
    password: string;
    avatar: string;
    role: Role;
    badges?: Badge[];
}

export interface AuthResponse {
    username: string;
    token: string;
    role: Role;
}

export interface Badge {
    id: number;
    name: string;
    description: string;
    image: string;
}

export interface Collected {
    id?: number;
    game: Game;
    user: User;
    badge: Badge;
    collectedAt: Date;
}

export interface Reaction {
    id?: number;
    game: Game;
    user: User;
    content: string;
    createdAt: Date;
}

export type Role = 'admin' | 'user' | 'guest';