
import { Game } from '../model/game';
import gameRepository from '../repository/game.db';

const games = [
    {
        id: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Action-adventure",
        description: "An open-world action-adventure game set in a fantastical world.",
        image: "https://example.com/image1.jpg"
    },
    {
        id: 2,
        title: "Super Mario Odyssey",
        genre: "Platform",
        description: "A platform game featuring Mario as he travels across various kingdoms.",
        image: "https://example.com/image2.jpg"
    },
    {
        id: 3,
        title: "Stardew Valley",
        genre: "Simulation",
        description: "A farming simulation game where players can manage their farm.",
        image: "https://example.com/image3.jpg"
    },
    {
        id: 4,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        description: "An action RPG set in a visually stunning open world.",
        image: "https://example.com/image4.jpg"
    },
];

const getAllGames = (): Game[] => {
    return gameRepository.getAllGames();
};

const getGameById = (id: number): Game | undefined => {
    const game = gameRepository.getGameById(id);
    if (!game) {
        throw new Error(`Game with id ${id} does not exist.`);
    }
    return game;
};

export default {
    getAllGames,
    getGameById,
};
