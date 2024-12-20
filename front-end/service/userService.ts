import { User, AuthResponse } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/users';

if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined in the environment variables');
}

const getAllUsers = async (): Promise<User[]> => {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    
    const users: User[] = await response.json();
    return users;
};

const getUserById = async (id: number): Promise<User> => {
    const response = await fetch(`${API_URL}/${id}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch user with id ${id}`);
    }
    
    const user: User = await response.json();
    return user;
};

const getUserByUsername = async (username: string): Promise<User> => {
    const response = await fetch(`${API_URL}/username/${username}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch user with username ${username}`);
    }
    
    const user: User = await response.json();
    return user;
};

const signup = async (userData: { username: string; password: string; avatar: string; role: string }): Promise<void> => {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Failed to sign up');
    }
};

const login = async (credentials: { username: string; password: string }): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Failed to log in');
    }

    const authResponse: AuthResponse = await response.json();
    localStorage.setItem('userName', authResponse.username);
    return authResponse;
};

const getUserByToken = async (token: string): Promise<User | null> => {
    const response = await fetch(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      return null;
    }
  
    const user: User = await response.json();
    return user;
  };

const updateUserProfile = async (username: string, avatar: string): Promise<void> => {
    const response = await fetch(`${API_URL}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, avatar }),
    });

    if (!response.ok) {
        throw new Error('Failed to update user profile');
    }
}

export {
    getAllUsers,
    getUserById,
    signup,
    login,
    getUserByUsername,
    getUserByToken,
    updateUserProfile,
};