import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import { AuthContext } from "../providers/AuthContext";
import { Loader } from "@mantine/core";

const OwnedGamesPage = () => {
  const { user } = useContext(UserContext);
  const { isAuthenticated } = useContext(AuthContext);

  return user && isAuthenticated ? (
    <>
      <h1>Shows all games a user purchased</h1>

      {user.ownedGames.map((game) => (
        <div key={game._id}>
          <span>{game.title}</span>
          <Link to={`/games/${game._id}`}>Store Page</Link>
          <Link to={`/games/${game._id}/addreview`}>Add Review</Link>
        </div>
      ))}
    </>
  ) : (
    <>
      <Loader color="blue" size="xl" type="dots" />
    </>
  );
};

export default OwnedGamesPage;
