/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "../styles/StorefrontPage.module.css";
import { GameContext } from "../providers/GameContext";
import { RangeSlider } from "@mantine/core";

const StorefrontPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState(0);

  const {
    categories,
    page,
    handleMinusPageClick,
    handlePlusPageClick,
    getAllGames,
    allGames,
  } = useContext(GameContext);

  const handleToast = () => toast("Testing 🤣", { theme: "dark" });

  const filteredGamesByName = allGames.filter((game) =>
    game.title
      .toLowerCase()
      .toString()
      .includes(search.toLocaleLowerCase().trim())
  );

  const filteredGamesByCategory = allGames.filter((game) => {
    return game.tags.includes(selectedCategory);
  });

  const filteredGamesByPrice = allGames.filter((game) => {
    return game.price >= price[0] && game.price <= price[1];
  });

  useEffect(() => {
    getAllGames();
  }, [page]);

  return (
    <>
      <div className={classes.topContainer}>
        <h1>ALL GAMES</h1>
        <input
          value={search}
          type="text"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <select onChange={(event) => setSelectedCategory(event.target.value)}>
          <option value="">Any</option>
          {categories.map((category, index) => (
            <option value={category} key={index}>
              {category}
            </option>
          ))}
        </select>

        <RangeSlider
          style={{ width: `20%` }}
          marks={[
            { value: 0, label: "€0" },
            { value: 50, label: "€50" },
            { value: 100, label: "€100" },
          ]}
          onChange={(event) => setPrice(event)}
        />
      </div>

      <div className={classes.gamesCtn}>
        {search && selectedCategory && price
          ? filteredGamesByName
              .filter((game) => filteredGamesByCategory.includes(game))
              .filter((game) => filteredGamesByPrice.includes(game))
              .map((game) => (
                <Link key={game._id} to={`/games/${game._id}`}>
                  <p>{game.title}</p>
                </Link>
              ))
          : search && selectedCategory
          ? filteredGamesByName
              .filter((game) => filteredGamesByCategory.includes(game))
              .map((game) => (
                <Link key={game._id} to={`/games/${game._id}`}>
                  <p>{game.title}</p>
                </Link>
              ))
          : search && price
          ? filteredGamesByName
              .filter((game) => filteredGamesByPrice.includes(game))
              .map((game) => (
                <Link key={game._id} to={`/games/${game._id}`}>
                  <p>{game.title}</p>
                </Link>
              ))
          : selectedCategory && price
          ? filteredGamesByCategory
              .filter((game) => filteredGamesByPrice.includes(game))
              .map((game) => (
                <Link key={game._id} to={`/games/${game._id}`}>
                  <p>{game.title}</p>
                </Link>
              ))
          : search
          ? filteredGamesByName.map((game) => (
              <Link key={game._id} to={`/games/${game._id}`}>
                <p>{game.title}</p>
              </Link>
            ))
          : selectedCategory
          ? filteredGamesByCategory.map((game) => (
              <Link key={game._id} to={`/games/${game._id}`}>
                <p>{game.title}</p>
              </Link>
            ))
          : price
          ? filteredGamesByPrice.map((game) => (
              <Link key={game._id} to={`/games/${game._id}`}>
                <p>{game.title}</p>
              </Link>
            ))
          : allGames.map((game) => (
              <Link key={game._id} to={`/games/${game._id}`}>
                <p>{game.title}</p>
              </Link>
            ))}
      </div>

      <Link to="/games/add">Add new game</Link>
      <button onClick={handleToast}>Test Toasts!!</button>

      <div className={classes.bottomContainer}>
        <span onClick={() => handleMinusPageClick()}>&lt;</span>
        <p>{page}</p>
        <span onClick={() => handlePlusPageClick()}>&gt;</span>
      </div>
    </>
  );
};

export default StorefrontPage;
