import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '@/types';
import Header from '@/components/Header';
import { getUserByUsername } from '@/service/userService';
import styles from '@/styles/ProfilePage.module.css';

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('userName');

      if (!token || !username) {
        console.log('No token or username found, redirecting to login');
        router.push('/login');
        return;
      }

      try {
        const fetchedUser = await getUserByUsername(username);
        console.log('Fetched user:', fetchedUser);
        setUser({
          ...fetchedUser,
          games: fetchedUser.games || [], // Ensure games is an array
          badges: fetchedUser.badges || [], // Ensure badges is an array
        });
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Failed to fetch user data');
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Profile</h1>
        <div className={styles.profile}>
          <img src={user.avatar} alt={user.username} className={styles.avatar} />
          <h2 className={styles.username}>{user.username}</h2>
          <p className={styles.role}>Role: {user.role}</p>
          <button className={styles.editButton}>Edit Profile</button>
        </div>
        <div className={styles.shelf}>
          <h2 className={styles.shelfTitle}>Badges</h2>
          <div className={styles.badges}>
            {user.badges?.length ? (
              user.badges.map((badge) => (
                <div key={badge.id} className={styles.badge}>
                  <img src={badge.image} alt={badge.name} className={styles.badgeImage} />
                  <p className={styles.badgeName}>{badge.name}</p>
                </div>
              ))
            ) : (
              <p>No badges earned yet.</p>
            )}
          </div>
        </div>
        <div className={styles.shelf}>
          <h2 className={styles.shelfTitle}>Owned Games</h2>
          <div className={styles.games}>
            {user.games?.length ? (
              user.games.map((game) => (
                <div key={game.id} className={styles.game}>
                  <img src={game.image} alt={game.title} className={styles.gameImage} />
                  <p className={styles.gameTitle}>{game.title}</p>
                </div>
              ))
            ) : (
              <p>No games owned yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
