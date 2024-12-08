// FILE: pages/games/[id].tsx

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Game } from '@/types';
import { getGameById } from '@/service/gameService';
import Header from '@/components/Header';
import Image from 'next/image';
import styles from '@/styles/GamesPage.module.css'
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface GamePageProps {
  game: Game | null;
}

const GamePage = ({ game }: GamePageProps) => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  const handleAddGame = () => {
    // Handle the action of adding the game to the user's collection
    setMessage('Game added to your collection!');
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>{game.title}</h1>
        <p className={styles.genre}>Genre: {game.genre}</p>
        <p className={styles.description}>{game.description}</p>
        {game.image && (
          <div className={styles.imageWrapper}>
            <Image
              src={`/images/${game.image}`}
              alt={game.title}
              layout="fill"
              className={styles.image}
            />
          </div>
        )}
        <p className={styles.releaseDate}>Release Date: {format(new Date(game.releaseDate), 'MM/dd/yyyy')}</p>
        {isLoggedIn && (
          <button className={styles.addButton} onClick={handleAddGame}>
            I have this game
          </button>
        )}
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const game = await getGameById(Number(id));

  return {
    props: {
      game: game || null,
    },
  };
};

export default GamePage;