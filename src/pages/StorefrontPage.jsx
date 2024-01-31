/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    return game.price >= price[0] * 100 && game.price <= price[1] * 100;
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
                  <div className={classes.gameCard}>
                    <div
                      className={classes.gameCardImage}
                      style={{ backgroundImage: `url(${game.image})` }}
                    />
                    <span className={classes.gameCardTitle}>{game.title}</span>
                    <span className={classes.gameCardPrice}>
                      {(game.price / 100).toFixed(2)}€
                    </span>
                  </div>
                </Link>
              ))
          : search && selectedCategory
          ? filteredGamesByName
              .filter((game) => filteredGamesByCategory.includes(game))
              .map((game) => (
                <Link key={game._id} to={`/games/${game._id}`}>
                  <div className={classes.gameCard}>
                    <div
                      className={classes.gameCardImage}
                      style={{ backgroundImage: `url(${game.image})` }}
                    />
                    <span className={classes.gameCardTitle}>{game.title}</span>
                    <span className={classes.gameCardPrice}>
                      {(game.price / 100).toFixed(2)}€
                    </span>
                  </div>
                </Link>
              ))
          : search && price
          ? filteredGamesByName
              .filter((game) => filteredGamesByPrice.includes(game))
              .map((game) => (
                <Link key={game._id} to={`/games/${game._id}`}>
                  <div className={classes.gameCard}>
                    <div
                      className={classes.gameCardImage}
                      style={{ backgroundImage: `url(${game.image})` }}
                    />
                    <span className={classes.gameCardTitle}>{game.title}</span>
                    <span className={classes.gameCardPrice}>
                      {(game.price / 100).toFixed(2)}€
                    </span>
                  </div>
                </Link>
              ))
          : selectedCategory && price
          ? filteredGamesByCategory
              .filter((game) => filteredGamesByPrice.includes(game))
              .map((game) => (
                <Link key={game._id} to={`/games/${game._id}`}>
                  <div className={classes.gameCard}>
                    <div
                      className={classes.gameCardImage}
                      style={{ backgroundImage: `url(${game.image})` }}
                    />
                    <span className={classes.gameCardTitle}>{game.title}</span>
                    <span className={classes.gameCardPrice}>
                      {(game.price / 100).toFixed(2)}€
                    </span>
                  </div>
                </Link>
              ))
          : search
          ? filteredGamesByName.map((game) => (
              <Link key={game._id} to={`/games/${game._id}`}>
                <div className={classes.gameCard}>
                  <div
                    className={classes.gameCardImage}
                    style={{ backgroundImage: `url(${game.image})` }}
                  />
                  <span className={classes.gameCardTitle}>{game.title}</span>
                  <span className={classes.gameCardPrice}>
                    {(game.price / 100).toFixed(2)}€
                  </span>
                </div>
              </Link>
            ))
          : selectedCategory
          ? filteredGamesByCategory.map((game) => (
              <Link key={game._id} to={`/games/${game._id}`}>
                <div className={classes.gameCard}>
                  <div
                    className={classes.gameCardImage}
                    style={{ backgroundImage: `url(${game.image})` }}
                  />
                  <span className={classes.gameCardTitle}>{game.title}</span>
                  <span className={classes.gameCardPrice}>
                    {(game.price / 100).toFixed(2)}€
                  </span>
                </div>
              </Link>
            ))
          : price
          ? filteredGamesByPrice.map((game) => (
              <Link key={game._id} to={`/games/${game._id}`}>
                <div className={classes.gameCard}>
                  <div
                    className={classes.gameCardImage}
                    style={{ backgroundImage: `url(${game.image})` }}
                  />
                  <span className={classes.gameCardTitle}>{game.title}</span>
                  <span className={classes.gameCardPrice}>
                    {(game.price / 100).toFixed(2)}€
                  </span>
                </div>
              </Link>
            ))
          : allGames.map((game) => (
              <Link key={game._id} to={`/games/${game._id}`}>
                <div className={classes.gameCard}>
                  <div
                    className={classes.gameCardImage}
                    style={{ backgroundImage: `url(${game.image})` }}
                  />
                  <span className={classes.gameCardTitle}>{game.title}</span>
                  <span className={classes.gameCardPrice}>
                    {(game.price / 100).toFixed(2)}€
                  </span>
                </div>
              </Link>
            ))}
      </div>

      <div className={classes.bottomContainer}>
        <span onClick={() => handleMinusPageClick()}>&lt;</span>
        <p>{page}</p>
        <span onClick={() => handlePlusPageClick()}>&gt;</span>
      </div>
    </>
  );
};

export default StorefrontPage;
