export class Game {
    private id?: number;
    private title: string;
    private genre: string;
    private description: string;
    private image: string;
    private releaseDate: Date;

    constructor(game: { id?: number; title: string; genre: string; description: string; image: string; releaseDate: Date }) {
        this.id = game.id;
        this.title = game.title;
        this.genre = game.genre;
        this.description = game.description;
        this.image = game.image;
        this.releaseDate = game.releaseDate;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getGenre(): string {
        return this.genre;
    }

    getDescription(): string {
        return this.description;
    }

    getImage(): string {
        return this.image;
    }

    getReleaseDate(): Date {
        return this.releaseDate;
    }

    equals(game: Game): boolean {
        return (
            this.title === game.getTitle() &&
            this.genre === game.getGenre() &&
            this.description === game.getDescription() &&
            this.image === game.getImage() &&
            this.releaseDate === game.getReleaseDate()
        );
    }
}
