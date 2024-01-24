import { Link } from "react-router-dom"

const UserReviewsPage = () => {
  return (
    <>
      <h1>Show all reviews a user has done</h1>
      <Link to="/games/1/updatereview">
        Update a review, should be an edit button on every review
      </Link>
      <Link to="/games/1/addreview">Add new review</Link>
      {/*this wont work from here
      because we dont have a game id here, either refactor 
      to modal, or make a small selector to
      show a list of games the user owns to add a review from here */}
    </>
  )
}

export default UserReviewsPage
