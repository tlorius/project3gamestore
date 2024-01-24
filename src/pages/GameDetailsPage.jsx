import { Link } from "react-router-dom"

const GameDetailsPage = () => {
  return (
    <>
      <h1>GameDetails</h1>
      <Link to="/games/1/update">Update Game</Link>
    </>
  )
}

export default GameDetailsPage
