import { Game } from '../types';
const API_URL = process.env.NEXT_PUBLIC_API_URL + '/games';

if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined in the environment variables');
}

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

const deleteGameByTitle = async (title: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${title}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete game with id ${title}`);
    }
  };

  const addGame = async (gameData: { title: string; genre: string; description: string; image: string; releaseDate: Date }): Promise<void> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add game');
    }
  };
  
export {
    getAllGames,
    getGameById,
    deleteGameByTitle,
    addGame,
}
