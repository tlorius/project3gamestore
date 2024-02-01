import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import { AuthContext } from "../providers/AuthContext";
import { Loader } from "@mantine/core";

import classes from "../styles/OwnedGames.module.css";

const OwnedGamesPage = () => {
  const { user } = useContext(UserContext);
  const { isAuthenticated } = useContext(AuthContext);

  return user && isAuthenticated ? (
    <div className={classes.ownedGamesContainer}>
      <h1 className={classes.ownedGamesTitle}>
        Games owned by <strong>{user.username}</strong>
      </h1>

      {user.ownedGames.map((game) => (
        <div key={game.id} className={classes.gameCard}>
          <div
            className={classes.gameCardImage}
            style={{ backgroundImage: `url(${game.imageUrl})` }}
          />
          <div className={classes.gameCardInfo}>
            <span className={classes.gameCardTitle}>
              {game.title.toUpperCase()}
            </span>
            <section className={classes.gameCardTags}>
              {game.tags.map((tag, index) => {
                return (
                  <span className={classes.gameCardTag} key={index}>
                    {tag}
                  </span>
                );
              })}
            </section>
            <div className={classes.gameCardPriceContainer}>
              <Link to={`/games/${game._id}`} className={classes.gameCardBtn}>
                + Infos
              </Link>
              <Link
                className={classes.wishListButton}
                to={`/games/${game._id}/addreview`}
              >
                Add Review
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <>
      <Loader color="blue" size="xl" type="dots" />
    </>
  );
};

export default OwnedGamesPage;
