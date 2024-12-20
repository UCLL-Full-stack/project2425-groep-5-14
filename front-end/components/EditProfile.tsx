import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from '@/components/Modal';
import styles from '@/styles/ProfilePage.module.css';
import { getUserByUsername, updateUserProfile } from '@/service/userService';
import { User } from '@/types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  onProfileUpdated: () => void;
}

const EditProfileModal = ({ isOpen, onClose, username, onProfileUpdated }: EditProfileModalProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      const fetchUser = async () => {
        try {
          const fetchedUser = await getUserByUsername(username);
          setUser(fetchedUser);
          setAvatar(fetchedUser.avatar);
        } catch (err) {
          setError('Failed to fetch user');
        }
      };

      fetchUser();
    }
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await updateUserProfile(user.username, avatar);
        onProfileUpdated();
        onClose();
      } catch (err) {
        setError('Failed to update profile');
      }
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h1 className={styles.title}>Edit Profile</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="avatar">Avatar URL</label>
            <input
              type="text"
              id="avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.saveButton}>Save Changes</button>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;