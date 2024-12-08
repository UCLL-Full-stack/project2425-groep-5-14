import { useEffect, useState } from "react";
import { Game } from "@/types";
import { getAllGames } from "@/service/gameService"; 
import Header from "@/components/Header";
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/GamesPage.module.css';

const GamesPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data: Game[] = await getAllGames();
        setGames(data);
        setFilteredGames(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred");
        }
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    const results = games.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGames(results);
  }, [searchTerm, games]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Header />
      <div>
        <h1 className="games-title">Games List</h1>
        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchBar}
        />
        {error && <p className="error-message">{error}</p>}
        <ul className="games-list">
          {filteredGames.map((game) => (
            <li key={game.id} className="game-item">
              <Link href={`/games/${game.id}`} legacyBehavior>
                <a>
                  <h2 className="game-title">{game.title}</h2>
                  <p>Genre: {game.genre}</p>
                  <p>{game.description}</p>
                  {game.image && (
                    <Image
                      src={`/images/${game.image}`}
                      alt={game.title}
                      className="game-image"
                      style={{objectFit: 'cover'}}
                      width={600}
                      height={400}
                    />
                  )}
                  <p>Release Date: {new Date(game.releaseDate).toLocaleDateString()}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default GamesPage;