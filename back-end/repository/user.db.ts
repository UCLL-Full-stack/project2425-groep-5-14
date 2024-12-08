import { PrismaClient } from '@prisma/client';
import { User } from '../model/user';

const prisma = new PrismaClient();

const getAllUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users.map((user: any) => new User(user));
};

const getUserById = async (id: number): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user ? new User(user) : null;
};

const getUserByUsername = async (username: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return user ? new User(user) : null;
};

const addUser = async (user: User): Promise<void> => {
  try {
    await prisma.user.create({
      data: {
        username: user.getUsername(),
        password: user.getPassword(),
        avatar: user.getAvatar(),
        role: user.getRole(),
      },
    });
  } catch (error) {
    console.error('Error adding user:', error);
    throw new Error('Error adding user');
  }
};

export default { getAllUsers, getUserById, getUserByUsername, addUser };