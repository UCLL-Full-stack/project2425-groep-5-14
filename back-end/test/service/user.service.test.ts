import userService from '../../service/user.service';
import userDB from '../../repository/user.db';
import { User } from '../../model/user';
import { Role } from '../../types';
import { generateJWTToken } from '../../util/jwt';

jest.mock('../../repository/user.db');
jest.mock('../../util/jwt');

describe('User Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = [
        new User('user1', 'pass', 'avatar.png', 'user' as Role),
        new User('user2', 'pass', 'avatar.png', 'user' as Role),
      ];
      (userDB.getAllUsers as jest.Mock).mockResolvedValue(users);

      const result = await userService.getAllUsers();
      expect(result).toEqual(users);
    });
  });

  describe('getUserByUsername', () => {
    it('should return the user with the given username', async () => {
      const user = new User('user1', 'pass', 'avatar.png', 'user' as Role);
      (userDB.getUserByUsername as jest.Mock).mockResolvedValue(user);

      const result = await userService.getUserByUsername('user1');
      expect(result).toEqual(user);
    });

    it('should return null if the user is not found', async () => {
      (userDB.getUserByUsername as jest.Mock).mockResolvedValue(null);

      const result = await userService.getUserByUsername('user1');
      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = { username: 'user1', password: 'pass', avatar: 'avatar.png', role: 'user' as Role };
      const user = new User(userData.username, userData.password, userData.avatar, userData.role);
      (userDB.addUser as jest.Mock).mockResolvedValue(user);

      await userService.createUser(userData);
      expect(userDB.addUser).toHaveBeenCalledWith(expect.any(User));
    });

    it('should throw an error if user creation fails', async () => {
      const userData = { username: 'user1', password: 'pass', avatar: 'avatar.png', role: 'user' as Role };
      (userDB.addUser as jest.Mock).mockRejectedValue(new Error('Error creating user'));

      await expect(userService.createUser(userData)).rejects.toThrow('Error creating user');
    });
  });

  describe('authenticate', () => {
    it('should return a token for valid credentials', async () => {
      const user = new User('user1', 'pass', 'avatar.png', 'user' as Role);
      await user.setPassword('pass');
      (userDB.getUserByUsername as jest.Mock).mockResolvedValue(user);
      (generateJWTToken as jest.Mock).mockReturnValue('token');

      const result = await userService.authenticate('user1', 'pass');
      expect(result).toEqual({ username: 'user1', token: 'token', role: 'user' });
    });

    it('should throw an error for invalid username', async () => {
      (userDB.getUserByUsername as jest.Mock).mockResolvedValue(null);

      await expect(userService.authenticate('user1', 'pass')).rejects.toThrow('Invalid username or password');
    });

    it('should throw an error for invalid password', async () => {
      const user = new User('user1', 'pass', 'avatar.png', 'user' as Role);
      await user.setPassword('pass');
      (userDB.getUserByUsername as jest.Mock).mockResolvedValue(user);

      await expect(userService.authenticate('user1', 'wrongpass')).rejects.toThrow('Invalid username or password');
    });
  });

  describe('updateUserProfile', () => {
    it('should update the user profile', async () => {
      const username = 'user1';
      const avatar = 'new-avatar.png';
      (userDB.updateUserProfile as jest.Mock).mockResolvedValue(undefined);

      await userService.updateUserProfile(username, avatar);
      expect(userDB.updateUserProfile).toHaveBeenCalledWith(username, avatar);
    });
  });
});