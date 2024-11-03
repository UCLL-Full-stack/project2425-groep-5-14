const API_URL = 'http://localhost:3000/games';

import { Game } from '../types';

const getAllGames = async (): Promise<Game[]> => {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
        throw new Error('Failed to fetch games');
    }
    
    const games: Game[] = await response.json();
    return games;
};

const getGameById = async (id: number): Promise<Game> => {
    const response = await fetch(`${API_URL}/${id}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch game with id ${id}`);
    }
    
    const game: Game = await response.json();
    return game;
};

export {
    getAllGames,
    getGameById
}
