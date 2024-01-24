import { Link } from "react-router-dom"

const OwnedGamesPage = () => {
  return (
    <>
      <h1>Shows all games a user purchased</h1>
      <Link to="/games/1/addreview">Add a new review to this game button</Link>
    </>
  )
}

export default OwnedGamesPage
