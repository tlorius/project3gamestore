import { Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const StorefrontPage = () => {
  const handleToast = () => toast("Testing 🤣", { theme: "dark" })
  return (
    <>
      <h1>Homepage</h1>
      <button onClick={handleToast}>Test Toasts!!</button>
      <div>
        <h3>this is a game</h3>
        <Link to="/games/1">Go to game details of this game</Link>
      </div>
      <Link to="/games/add">Add new game</Link>
      <ToastContainer />
    </>
  )
}

export default StorefrontPage
