import { User } from '../../model/user';
import { Badge } from '../../model/badge';
import { Role } from '../../types';

describe('User', () => {
    it('should create a user and return properties', () => {
        const user = new User({ 
            username: 'testUser', 
            password: 'pass123', 
            avatar: 'avatar.png', 
            role: 'student'
        });
        expect(user.getUsername()).toBe('testUser');
        expect(user.getPassword()).toBe('pass123');
        expect(user.getAvatar()).toBe('avatar.png');
        expect(user.getRole()).toBe('student'); 
    });

    it('should check equality of users', () => {
        const user1 = new User({ 
            username: 'testUser', 
            password: 'pass123', 
            avatar: 'avatar.png', 
            role: 'student'
        });
        const user2 = new User({ 
            username: 'testUser', 
            password: 'pass123', 
            avatar: 'avatar.png', 
            role: 'student'
        });
        expect(user1.equals(user2)).toBe(true);
    });

    it('should return false for unequal users', () => {
        const user1 = new User({ 
            username: 'testUser', 
            password: 'pass123', 
            avatar: 'avatar.png', 
            role: 'student'
        });
        const user2 = new User({ 
            username: 'anotherUser', 
            password: 'diffPass', 
            avatar: 'avatar2.png', 
            role: 'lecturer'
        });
        expect(user1.equals(user2)).toBe(false);
    });

    it('should assign a badge to the user', () => {
        const user = new User({ 
            username: 'user1', 
            password: 'password', 
            avatar: 'avatar.png', 
            role: 'student'
        });
        const badge = new Badge({ 
            name: 'Achievement', 
            description: 'Unlocked achievement', 
            image: 'badge.png' 
        });

        user.addBadge(badge);
        expect(user.getBadges()).toContain(badge);
    });

    it('should not add duplicate badges to the user', () => {
        const user = new User({ 
            username: 'user1', 
            password: 'password', 
            avatar: 'avatar.png', 
            role: 'student'
        });
        const badge = new Badge({ 
            name: 'Achievement', 
            description: 'Unlocked achievement', 
            image: 'badge.png' 
        });

        user.addBadge(badge);
        user.addBadge(badge);
        expect(user.getBadges().length).toBe(1);
    });
});
