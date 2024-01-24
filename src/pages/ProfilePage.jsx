import { Link } from "react-router-dom"

const ProfilePage = () => {
  return (
    <>
      <h1>the users profile page</h1>
      <Link to="/profile/1/wishlist">Wishlist</Link>
      <Link to="/profile/1/reviews">All Reviews</Link>
      <Link to="/profile/1/games">All Games</Link>
    </>
  )
}

export default ProfilePage
