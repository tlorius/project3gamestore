import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserContext";

const OwnedGamesPage = () => {
  const { user } = useContext(UserContext);

  const userOwnedGames = user.ownedGames;
  console.log(userOwnedGames);

  return (
    <>
      <h1>Shows all games a user purchased</h1>

      {userOwnedGames.map((game) => (
        <div key={game.id}>
          <span>{game.title}</span>
        </div>
      ))}

      <Link to="/games/1/addreview">Add a new review to this game button</Link>
    </>
  );
};

export default OwnedGamesPage;
