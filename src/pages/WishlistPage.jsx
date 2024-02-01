/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthContext";
import { UserContext } from "../providers/UserContext";
import { Link } from "react-router-dom";
import { Loader } from "@mantine/core";

import classes from "../styles/WishList.module.css";

const WishlistPage = () => {
  const { userId, isAuthenticated } = useContext(AuthContext);
  const { user, setNeedsRefresh, removeGameFromAccount } =
    useContext(UserContext);

  useEffect(() => {
    setNeedsRefresh();
  }, [userId]);

  return isAuthenticated && user ? (
    <div className={classes.wishListPageContainer}>
      <h1 className={classes.wishListTitle}>
        Wishlist Page of <strong>{user && user.username}</strong>
      </h1>
      <div className={classes.gamesCnt}>
        {user.wishlistedGames.length !== 0 ? (
          user.wishlistedGames.map((game) => {
            return (
              <>
                <div className={classes.gameCard}>
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
                      <span className={classes.gameCardPrice}>
                        {game.price === 0
                          ? "FREE"
                          : `${(game.price / 100).toFixed(2)}€`}
                      </span>

                      <Link
                        to={`/games/${game._id}`}
                        className={classes.gameCardBtn}
                      >
                        + Infos
                      </Link>
                    </div>
                    <button
                      className={classes.wishListButton}
                      type="button"
                      onClick={() =>
                        removeGameFromAccount("wishlist", game._id)
                      }
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <div>
            <h2 className={classes.noGamesText}>
              You have no games wishlisted right now.
            </h2>
            <Link className={classes.noGamesLink} to="/">
              In the store you can wishlist your favorite games!
            </Link>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loader color="blue" size="xl" type="dots" />
  );
};

export default WishlistPage;
