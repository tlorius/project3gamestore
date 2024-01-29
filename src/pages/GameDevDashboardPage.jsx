import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../providers/UserContext";

const GameDevDashboardPage = () => {
  const [games, setGames] = useState([]);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    const fetchGamesByUser = async () => {
      const response = await fetch(`/api/games/by-user/${userId}`);
      const data = await response.json();
      setGames(data);
    };

    if (userId) {
      fetchGamesByUser();
    }
  }, [userId]);

  return (
    <div>
      <h1>Game Developer Dashboard</h1>
      {games.length > 0 ? (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <h2>{game.title}</h2>
              <p>Description: {game.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not created any games yet.</p>
      )}
    </div>
  );
};

export default GameDevDashboardPage;
