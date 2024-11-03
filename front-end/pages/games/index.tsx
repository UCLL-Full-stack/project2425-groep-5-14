// pages/games.tsx
import { useEffect, useState } from "react";
import { Game } from "@/types";
import { getAllGames } from "@/service/gameService"; 

const GamesPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchGames();
  }, []);

  return (
    <div>
      <h1 className="games-title">Games List</h1>
      {error && <p className="error-message">{error}</p>}
      <ul className="games-list">
        {games.map((game) => (
          <li key={game.id} className="game-item">
            <h2 className="game-title">{game.title}</h2>
            <p>Genre: {game.genre}</p>
            <p>{game.description}</p>
            {game.image && (
              <img
                src={game.image}
                alt={game.title}
                className="game-image"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GamesPage;
