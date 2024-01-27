import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import StorefrontPage from "./pages/StorefrontPage";
import NotFoundPage from "./pages/NotFoundPage";
import GameDetailsPage from "./pages/GameDetailsPage";
import AddGamePage from "./pages/AddGamePage";
import UpdateGamePage from "./pages/UpdateGamePage";
import AddReviewPage from "./pages/AddReviewPage";
import UpdateReviewPage from "./pages/UpdateReviewPage";
import GameReviewsPage from "./pages/GameReviewsPage";
import UserReviewsPage from "./pages/UserReviewsPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import WishlistPage from "./pages/WishlistPage";
import OwnedGamesPage from "./pages/OwnedGamesPage";
import ReviewDetailPage from "./pages/ReviewDetailPage";
import "@mantine/core/styles.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<StorefrontPage />} />
        <Route path="/games/:gameId" element={<GameDetailsPage />} />
        <Route path="/games/add" element={<AddGamePage />} />
        <Route path="/games/:gameId/update" element={<UpdateGamePage />} />
        <Route path="/games/:gameId/addreview" element={<AddReviewPage />} />
        <Route
          path="/games/:gameId/reviews/:reviewId"
          element={<ReviewDetailPage />}
        />
        <Route
          path="/games/:gameId/updatereview"
          element={<UpdateReviewPage />}
        />
        <Route path="/games/:gameId/reviews" element={<GameReviewsPage />} />

        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/profile/:userId/reviews" element={<UserReviewsPage />} />
        <Route path="/profile/:userId/wishlist" element={<WishlistPage />} />
        <Route path="/profile/:userId/games" element={<OwnedGamesPage />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
