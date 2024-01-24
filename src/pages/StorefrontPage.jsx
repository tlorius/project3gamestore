import { Link } from "react-router-dom"

const StorefrontPage = () => {
  return (
    <>
      <h1>Homepage</h1>
      <div>
        <h3>this is a game</h3>
        <Link to="/games/1">Go to game details of this game</Link>
      </div>
      <Link to="/games/add">Add new game</Link>
    </>
  )
}

export default StorefrontPage
