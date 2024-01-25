import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "../styles/StorefrontPage.module.css";
import axios from "axios";

const StorefrontPage = () => {
  const [games, setGames] = useState([]);

  const handleToast = () => toast("Testing 🤣", { theme: "dark" });

  const getBooks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/games`
      );
      if (response.status === 200) {
        setGames(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <h1>ALL GAMES</h1>

      <div className={classes.gamesCtn}>
        {games.map((game) => (
          <Link key={game._id} to={`/games/${game._id}`}>
            <p>{game.title}</p>
          </Link>
        ))}
      </div>
      <div>
        <h3>this is a game</h3>
        <Link to="/games/1">Go to game details of this game</Link>
      </div>

      <Link to="/games/add">Add new game</Link>
      <button onClick={handleToast}>Test Toasts!!</button>
      <ToastContainer />
    </>
  );
};

export default StorefrontPage;
