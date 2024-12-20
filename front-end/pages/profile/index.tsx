import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Badge, User } from '@/types';
import { Game } from '@/types';
import Header from '@/components/Header';
import { getUserByUsername } from '@/service/userService';
import { getCollectedGamesByUsername} from '@/service/collectedService';
import { getCollectedBadgesByUsername} from '@/service/collectedService';
import styles from '@/styles/ProfilePage.module.css';
import Link from 'next/link';
import EditProfileModal from '@/components/EditProfile';

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [collectedGames, setCollectedGames] = useState<Game[] | null>(null);
  const [collectedBadges, setCollectedBadges] = useState<Badge[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

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
        games: fetchedUser.games || [],
        badges: fetchedUser.badges || [],
      });
      setCollectedGames(await getCollectedGamesByUsername(username));
      console.log('Fetched collected games:', collectedGames);
      setCollectedBadges(await getCollectedBadgesByUsername(username));
      console.log('Fetched collected badges:', collectedBadges);
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      setError('Failed to fetch user data');
      router.push('/login');
    }
  };

  useEffect(() => {
    

    fetchUser();
  }, [router]);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleProfileUpdated = () => {
    fetchUser();
  };

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
          <img src={"/images/" + user.avatar} alt={user.username} className={styles.avatar} />
          <h2 className={styles.username}>{user.username}</h2>
          <p className={styles.role}>Role: {user.role}</p>
          <button onClick={handleEditProfile} className={styles.editButton}>Edit Profile</button>
        </div>
        <div className={styles.shelf}>
          <h2 className={styles.shelfTitle}>Badges</h2>
          <div className={styles.badges}>
            {collectedBadges?.length ? (
              collectedBadges.map((badge) => (
                <div key={badge.id} className={styles.badge}>
                  <img src={'/images/' + badge.image} alt={badge.name} className={styles.badgeImage} />
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
            {collectedGames?.length ? (
              collectedGames.map((game) => (
                <Link key={game.id} href={`/games/${game.id}`}>
                  <div key={game.id} className={styles.game}>
                    <img src={"/images/" + game.image} alt={game.title} className={styles.gameImage} />
                    <p className={styles.gameTitle}>{game.title}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p>No games owned yet.</p>
            )}
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        username={user.username}
        onProfileUpdated={handleProfileUpdated}
      />
    </>
  );
};

export default ProfilePage;
