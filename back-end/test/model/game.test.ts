import { User } from '../../model/user';
import { Badge } from '../../model/badge';
import { Role } from '../../types';
import bcrypt from 'bcrypt';

describe('User', () => {
  let userData: { username: string; password: string; avatar: string; role: Role; id?: number };
  let badgeData: { id: number; name: string; description: string; image: string };

  beforeEach(() => {
    userData = {
      id: 1,
      username: 'testuser',
      password: 'password',
      avatar: 'avatar.png',
      role: 'user',
    };

    badgeData = {
      id: 1,
      name: 'Test Badge',
      description: 'A test badge',
      image: 'test-badge.png',
    };
  });

  describe('constructor', () => {
    it('should create a user with the given data', () => {
      const user = new User(userData.username, userData.password, userData.avatar, userData.role, userData.id);

      expect(user.getId()).toBe(userData.id);
      expect(user.getUsername()).toBe(userData.username);
      expect(user.getPassword()).toBe(userData.password);
      expect(user.getAvatar()).toBe(userData.avatar);
      expect(user.getRole()).toBe(userData.role);
    });

    it('should create a user without an id', () => {
      const { id, ...dataWithoutId } = userData;
      const user = new User(dataWithoutId.username, dataWithoutId.password, dataWithoutId.avatar, dataWithoutId.role);

      expect(user.getId()).toBeUndefined();
      expect(user.getUsername()).toBe(dataWithoutId.username);
      expect(user.getPassword()).toBe(dataWithoutId.password);
      expect(user.getAvatar()).toBe(dataWithoutId.avatar);
      expect(user.getRole()).toBe(dataWithoutId.role);
    });
  });

  describe('getters', () => {
    let user: User;

    beforeEach(() => {
      user = new User(userData.username, userData.password, userData.avatar, userData.role, userData.id);
    });

    it('should return the id', () => {
      expect(user.getId()).toBe(userData.id);
    });

    it('should return the username', () => {
      expect(user.getUsername()).toBe(userData.username);
    });

    it('should return the password', () => {
      expect(user.getPassword()).toBe(userData.password);
    });

    it('should return the avatar', () => {
      expect(user.getAvatar()).toBe(userData.avatar);
    });

    it('should return the role', () => {
      expect(user.getRole()).toBe(userData.role);
    });
  });

  describe('equals', () => {
    let user1: User;
    let user2: User;

    beforeEach(() => {
      user1 = new User(userData.username, userData.password, userData.avatar, userData.role, userData.id);
      user2 = new User(userData.username, userData.password, userData.avatar, userData.role, userData.id);
    });

    it('should return true for users with the same data', () => {
      expect(user1.equals(user2)).toBe(true);
    });

    it('should return false for users with different usernames', () => {
      const differentUser = new User('differentuser', userData.password, userData.avatar, userData.role, userData.id);
      expect(user1.equals(differentUser)).toBe(false);
    });

    it('should return false for users with different passwords', () => {
      const differentUser = new User(userData.username, 'differentpassword', userData.avatar, userData.role, userData.id);
      expect(user1.equals(differentUser)).toBe(false);
    });

    it('should return false for users with different avatars', () => {
      const differentUser = new User(userData.username, userData.password, 'differentavatar.png', userData.role, userData.id);
      expect(user1.equals(differentUser)).toBe(false);
    });

    it('should return false for users with different roles', () => {
      const differentUser = new User(userData.username, userData.password, userData.avatar, 'admin' as Role, userData.id);
      expect(user1.equals(differentUser)).toBe(false);
    });
  });

  describe('badges', () => {
    let user: User;
    let badge: Badge;

    beforeEach(() => {
      user = new User(userData.username, userData.password, userData.avatar, userData.role, userData.id);
      badge = new Badge(badgeData);
    });

    it('should add a badge to the user', () => {
      user.addBadge(badge);
      expect(user.getBadges()).toContain(badge);
    });

    it('should not add the same badge twice', () => {
      user.addBadge(badge);
      user.addBadge(badge);
      expect(user.getBadges().length).toBe(1);
    });
  });

  describe('password', () => {
    let user: User;

    beforeEach(() => {
      user = new User(userData.username, userData.password, userData.avatar, userData.role, userData.id);
    });

    it('should hash the password when setPassword is called', async () => {
      const newPassword = 'newpassword';
      await user.setPassword(newPassword);
      expect(await bcrypt.compare(newPassword, user.getPassword())).toBe(true);
    });

    it('should return true for correct password comparison', async () => {
      const newPassword = 'newpassword';
      await user.setPassword(newPassword);
      expect(await user.comparePassword(newPassword)).toBe(true);
    });

    it('should return false for incorrect password comparison', async () => {
      const newPassword = 'newpassword';
      await user.setPassword(newPassword);
      expect(await user.comparePassword('wrongpassword')).toBe(false);
    });
  });
});