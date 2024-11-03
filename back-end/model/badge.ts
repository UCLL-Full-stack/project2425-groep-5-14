export class Badge {
    private id?: number;
    private name: string;
    private description: string;
    private image: string;

    constructor(badge: { id?: number; name: string; description: string; image: string }) {
        this.id = badge.id;
        this.name = badge.name;
        this.description = badge.description;
        this.image = badge.image;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getImage(): string {
        return this.image;
    }

    equals(badge: Badge): boolean {
        return (
            this.name === badge.getName() &&
            this.description === badge.getDescription() &&
            this.image === badge.getImage()
        );
    }
}
