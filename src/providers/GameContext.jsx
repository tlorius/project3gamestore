import { createContext, useState } from "react";
import axios from "axios";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [allGames, setAllGames] = useState([]);
  const [gamesTotal, setGamesTotal] = useState([]);
  const [page, setPage] = useState(1);
  const categories = [
    "Action",
    "Adventure",
    "Arcade",
    "Beat 'em up",
    "Board Game",
    "Building",
    "Card Game",
    "Casual",
    "Crafting",
    "Cyberpunk",
    "Dungeon Crawler",
    "Early Access",
    "Educational",
    "eSports",
    "Exploration",
    "Family-Friendly",
    "Fantasy",
    "Fighter",
    "First-Person",
    "FPS",
    "Hardcore",
    "Hack and Slash",
    "Historical",
    "Horror",
    "Indie",
    "Interactive Fiction",
    "Isometric",
    "MMORPG",
    "MOBA",
    "Multiplayer",
    "Music",
    "Mystery",
    "Narrative",
    "Online Multiplayer",
    "Open World",
    "Party",
    "Physics",
    "Platformer",
    "Point-and-Click",
    "Post-Apocalyptic",
    "Procedural Generation",
    "Puzzle",
    "Racing",
    "Real-Time",
    "Retro",
    "Rhythm",
    "Roguelike",
    "Roguelite",
    "RPG",
    "Racing",
    "Sci-Fi",
    "Shooter",
    "Side-Scroller",
    "Simulation",
    "Singleplayer",
    "Space",
    "Sports",
    "Stealth",
    "Steampunk",
    "Strategy",
    "Superhero",
    "Survival",
    "Tactical",
    "Text-Based",
    "Third-Person",
    "Thriller",
    "Top-Down",
    "Tower Defense",
    "Turn-Based",
    "VR",
    "VR Supported",
    "War",
    "Zombies",
  ];

  const getAllGames = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/games/?page=${page}`
      );
      if (response.status === 200) {
        setGamesTotal(response.data.totalGames);
        setAllGames(response.data.gameList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlusPageClick = () => {
    const pages = Math.ceil(gamesTotal / 20);

    if (page < pages) {
      setPage(page + 1);
    }
  };

  const handleMinusPageClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <GameContext.Provider
      value={{
        categories,
        page,
        handleMinusPageClick,
        handlePlusPageClick,
        setPage,
        getAllGames,
        setGamesTotal,
        gamesTotal,
        allGames,
        setAllGames,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
