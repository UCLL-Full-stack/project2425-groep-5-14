import { User } from '../model/user';
import userDB from '../repository/user.db';
import { generateJWTToken } from '../util/jwt';
import { Role } from '../types';

const getAllUsers = async (): Promise<User[]> => {
  return await userDB.getAllUsers();
};

// const getUserById = async (id: number): Promise<User | null> => {
//   return await userDB.getUserById(id);
// };

const getUserByUsername = async (username: string): Promise<User | null> => {
  return await userDB.getUserByUsername(username);
};

const createUser = async (userData: { username: string; password: string; avatar: string; role: Role }): Promise<void> => {
  try {
    const user = new User(userData.username, userData.password, userData.avatar, userData.role);
    await user.setPassword(userData.password);
    await userDB.addUser(user);
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  }
};

const authenticate = async (username: string, password: string): Promise<{ username: string; token: string; role: string }> => {
  const user = await userDB.getUserByUsername(username);
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error('Invalid username or password');
  }

  const token = generateJWTToken(user.getUsername(), user.getRole());
  return { username: user.getUsername(), token, role: user.getRole() };
};

export default { getAllUsers, 
  // getUserById,
   createUser, authenticate, getUserByUsername };