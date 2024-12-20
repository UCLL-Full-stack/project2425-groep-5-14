import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import styles from '@/styles/AdminPage.module.css';
import { getUserByToken, getUserByUsername } from '@/service/userService';
import { getAllGames, addGame, deleteGameByTitle } from '@/service/gameService';
import { User, Game } from '@/types';

const AdminPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newGame, setNewGame] = useState<{ title: string; genre: string; description: string; image: string; releaseDate: string }>({
    title: '',
    genre: '',
    description: '',
    image: '',
    releaseDate: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Debugging log

    if (!token) {
      console.log('No token found, redirecting to login'); // Debugging log
      router.push('/login');
      return;
    }

    const fetchUser = async () => {
      const fetchedUser = await getUserByUsername(localStorage.getItem('userName')!);
      console.log('Fetched user:', fetchedUser); // Debugging log

      if (!fetchedUser || fetchedUser.role !== 'admin') {
        console.log('User is not an admin, redirecting to login'); // Debugging log
        setError('Access denied. Admins only.');
        router.push('/login');
        return;
      }

      setUser(fetchedUser);
    };

    fetchUser();
  }, [router]);

  const fetchGames = async () => {
    try {
      const data: Game[] = await getAllGames();
      setGames(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  const handleDelete = async (title: string) => {
    try {
      await deleteGameByTitle(title);
      setGames(games.filter(game => game.title !== title));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  const handleAddGame = async () => {
    try {
      await addGame({ ...newGame, releaseDate: new Date(newGame.releaseDate) });
      setIsAddModalOpen(false);
      fetchGames();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  const openDeleteModal = () => {
    fetchGames();
    setIsDeleteModalOpen(true);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <p className={styles.welcome}>Welcome, {user.username}!</p>
        <button onClick={openDeleteModal} className={styles.deleteButton}>
          Delete Game
        </button>
        <button onClick={openAddModal} className={styles.addButton}>
          Add Game
        </button>
      </div>
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2>Delete Game</h2>
        <ul className={styles.modalGamesList}>
          {games.map((game) => (
            <li key={game.id} className={styles.modalGameItem}>
              <span>{game.title}</span>
              <button onClick={() => handleDelete(game.title)} className={styles.modalDeleteButton}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </Modal>
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <h2>Add Game</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddGame(); }}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={newGame.title}
              onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              id="genre"
              value={newGame.genre}
              onChange={(e) => setNewGame({ ...newGame, genre: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={newGame.description}
              onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              value={newGame.image}
              onChange={(e) => setNewGame({ ...newGame, image: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="releaseDate">Release Date</label>
            <input
              type="date"
              id="releaseDate"
              value={newGame.releaseDate}
              onChange={(e) => setNewGame({ ...newGame, releaseDate: e.target.value })}
              required
            />
          </div>
          <button type="submit" className={styles.modalAddButton}>
            Add Game
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AdminPage;