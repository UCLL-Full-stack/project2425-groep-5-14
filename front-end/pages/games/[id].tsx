import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Game } from '@/types';
import { getGameById } from '@/service/gameService';
import Header from '@/components/Header';
import Image from 'next/image';
import styles from './GamePage.module.css';

interface GamePageProps {
  game: Game | null;
}

const GamePage = ({ game }: GamePageProps) => {
  const router = useRouter();

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
        <p className={styles.releaseDate}>Release Date: {new Date(game.releaseDate).toLocaleDateString()}</p>
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