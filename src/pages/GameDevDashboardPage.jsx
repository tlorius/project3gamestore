import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { Link } from "react-router-dom";
import { Loader } from "@mantine/core";

const GameDevDashboardPage = () => {
  const [games, setGames] = useState([]);
  const [revenue, setRevenue] = useState();
  const { requestWithToken, userId, isAuthenticated } = useContext(AuthContext);

  const fetchRevenueData = async () => {
    try {
      const response = await requestWithToken(`/invoices/dev`);
      console.log("Response from server:", response);

      if (response.status === 200) {
        setRevenue(response.data);
        console.log("Fetched revenues:", response.data);
      }
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  const fetchGamesByUser = async () => {
    try {
      const response = await requestWithToken(`/games/dev/${userId}`);
      setGames(response.data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchGamesByUser();
      fetchRevenueData();
    }
  }, [userId]);

  return isAuthenticated ? (
    <div>
      <h1>Game Developer Dashboard</h1>
      <Link to="/games/add">Add new game</Link>
      {games.length > 0 ? (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <Link to={`/games/${game.id}`}>
                <h2>{game.title}</h2>
                <p>Price: {(game.price / 100).toFixed(2)}€</p>
                <p>Description: {game.description}</p>
                <p>Discount: {game.discountInPercent}%</p>
                <p>Tags: {game.tags.join(", ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not created any games yet.</p>
      )}
      <div>
        {revenue && (
          <>
            <h3>
              Revenue of All Time:{" "}
              {(revenue?.sumAllTimeByDev.sum / 100).toFixed(2)}€
            </h3>
            <h3>All Time Sold Games: {revenue?.sumAllTimeByDev.count}</h3>
            <h3>
              Revenue in the Last 30 Days:{" "}
              {(revenue?.sumThirtyDaysDev.sum / 100).toFixed(2)}€
            </h3>
            <h3>Last 30 Days Sold Games: {revenue?.sumAllTimeByDev.count}</h3>
          </>
        )}
      </div>
    </div>
  ) : (
    <>
      <Loader color="blue" size="xl" type="dots" />
    </>
  );
};

export default GameDevDashboardPage;
