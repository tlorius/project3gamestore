import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserContext";

const GameDevDashboardPage = () => {
  const [games, setGames] = useState([]);
  const [revenueAllTime, setRevenueAllTime] = useState(0);
  const { requestWithToken, userId } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  const fetchRevenueAllTime = async () => {
    try {
      const response = await requestWithToken(`/invoices/dev`);
      if (response.status === 200) {
        const revenues = response.data.revenues;
        if (revenues && revenues.length > 0) {
          const totalRevenueInEuros = revenues[0].sum;
          setRevenueAllTime(totalRevenueInEuros);
        }
      }
    } catch (error) {
      console.error("Error fetching revenue:", error);
    }
  };

  useEffect(() => {
    const fetchGamesByUser = async () => {
      const response = await requestWithToken(`/games/dev/${userId}`);
      setGames(response.data);
    };

    if (userId) {
      fetchGamesByUser();
      fetchRevenueAllTime();
    }
  }, [userId]);

  // Assuming you have a function to handle game purchase, call fetchRevenueAllTime after a game is purchased
  const handleGamePurchase = async (gameId) => {
    try {
      const purchaseResponse = await requestWithToken(
        `/games/purchase/${gameId}`,
        "POST"
      );
      if (purchaseResponse.status === 200) {
        fetchRevenueAllTime(); // Fetch updated revenue after a game is purchased
      }
    } catch (error) {
      console.error("Error purchasing game:", error);
    }
  };

  return (
    <div>
      <h1>Game Developer Dashboard</h1>
      {games.length > 0 ? (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <Link to={`/games/${game.id}`}>
                <h2>{game.title}</h2>
                <p>Price: {game.price}€</p>
                <p>Description: {game.description}</p>
                <p>Discount: {game.discountInPercent}%</p>
                <p>Tags: {game.tags.join(", ")}</p>
                <h3>Revenue of All Time: {revenueAllTime.toFixed(2)}€</h3>
              </Link>
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
