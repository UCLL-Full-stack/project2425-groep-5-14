import { Game } from '../types';
import { Badge } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/collected';

if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined in the environment variables');
}

const getCollectedGamesByUsername = async (username: string): Promise<Game[]> => {
    const response = await fetch(`${API_URL}/games/${username}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch collected games for user with username ${username}`);
    }
    
    const games: Game[] = await response.json();
    return games;
};
const getCollectedBadgesByUsername = async (username: string): Promise<Badge[]> => {
    const response = await fetch(`${API_URL}/badges/${username}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch collected badges for user with username ${username}`);
    }
    
    const badges: Badge[] = await response.json();
    return badges;
};

const collectGame = async (username: string, gameId: number): Promise<void> => {
    const response = await fetch(`${API_URL}/collectGame`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, gameId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to collect game');
    }

    return response.json();
};

export {
    getCollectedGamesByUsername,
    getCollectedBadgesByUsername,
    collectGame,
};