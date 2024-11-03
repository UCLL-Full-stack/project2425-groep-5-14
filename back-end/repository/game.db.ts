import { Game } from '../model/game';

const games: Game[] = [
    
];

const getAllGames = (): Game[] => {
    return games;
};

const getGameById = (id: number): Game | undefined => {
    return games.find(game => game.getId() === id);
};

const addGame = (game: Game): void => {
    games.push(game);
};

// Adding some test data
addGame(new Game({
    id: 1,
    title: 'The Legend of Zelda: Breath of the Wild',
    genre: 'Action-Adventure',
    description: 'An open-world adventure game set in the kingdom of Hyrule.',
    image: 'https://ibb.co/JmC2348'
}));
addGame(new Game({
    id: 2,
    title: 'Super Mario Odyssey',
    genre: 'Platformer',
    description: 'Join Mario on a globe-trotting adventure in this platforming game.',
    image: 'https://ibb.co/JmC2348'
}));
addGame(new Game({
    id: 3,
    title: 'Minecraft',
    genre: 'Sandbox',
    description: 'A sandbox game that allows players to build and explore in a blocky 3D world.',
    image: 'https://ibb.co/JmC2348'
}));
addGame(new Game({
    id: 4,
    title: 'The Witcher 3: Wild Hunt',
    genre: 'RPG',
    description: 'An open-world RPG where you play as Geralt of Rivia, a monster hunter.',
    image: 'https://ibb.co/JmC2348'
}));
addGame(new Game({
    id: 5,
    title: 'Fortnite',
    genre: 'Battle Royale',
    description: 'A battle royale game where players compete to be the last one standing.',
    image: 'https://ibb.co/JmC2348'
}));

export default {
    getAllGames,
    getGameById,
    addGame
};
