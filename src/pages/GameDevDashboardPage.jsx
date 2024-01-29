import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthContext";

const GameDevDashboardPage = () => {
  const [games, setGames] = useState([]);
  const { requestWithToken, userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchGamesByUser = async () => {
      const response = await requestWithToken(`/games/dev/${userId}`);
      setGames(response.data);
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
