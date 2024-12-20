import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Game } from '@/types';
import { getGameById } from '@/service/gameService';
import Header from '@/components/Header';
import Image from 'next/image';
import styles from '@/styles/GamesPage.module.css';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { collectGame, getCollectedGamesByUsername } from '@/service/collectedService'; // Adjust the import according to your project structure

interface GamePageProps {
  game: Game | null;
}

const GamePage = ({ game }: GamePageProps) => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isCollected, setIsCollected] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const checkIfCollected = async () => {
      const username = localStorage.getItem('userName');
      if (username && game) {
        const collectedGames = await getCollectedGamesByUsername(username);
        const collected = collectedGames.some(collectedGame => collectedGame.id === game.id);
        setIsCollected(collected);
      }
    };

    checkIfCollected();
  }, [game]);

  const handleAddGame = async () => {
    try {
      const username = localStorage.getItem('userName');
      if (!username) {
        setMessage('User not logged in');
        return;
      }
      await collectGame(username, game!.id);
      setMessage('Game collected successfully');
      setIsCollected(true);
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    }
  };

  const handleNextGame = async () => {
    const nextGameId = game!.id + 1;
    try {
      if (await getGameById(nextGameId)) {
        router.push(`/games/${nextGameId}`);
      } else if (await getGameById(nextGameId + 1)) {
        router.push(`/games/${nextGameId + 1}`);
      } else {
        router.push('/games');
      }
    } catch (error) {
      console.error('Error fetching next game:', error);
      router.push('/games');
    }
  };  

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

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
          <button
            className={`${styles.addButton} ${isCollected ? styles.collectedButton : ''}`}
            onClick={handleAddGame}
            disabled={isCollected}
          >
            {isCollected ? 'Game Collected' : 'I have this game'}
          </button>
        )}
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.buttonContainer}>
          <button className={styles.backButton} onClick={() => router.push('/games')}>
            Back to Games
          </button>
          <button className={styles.nextButton} onClick={handleNextGame}>
            Next Game
          </button>
        </div>
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