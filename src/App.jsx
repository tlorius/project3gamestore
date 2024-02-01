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
import AdminDashboardPage from "./pages/AdminDashboardPage";
import GameDevDashboardPage from "./pages/GameDevDashboardPage";
import CheckoutPage from "./pages/CheckoutPage";
import UserInvoicesPage from "./pages/UserInvoicesPage";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<StorefrontPage />} />
        <Route path="/games/:gameId" element={<GameDetailsPage />} />
        <Route
          path="/games/add"
          element={
            <PrivateRoute>
              <AddGamePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/games/:gameId/update"
          element={
            <PrivateRoute>
              <UpdateGamePage />
            </PrivateRoute>
          }
        />
        <Route path="/games/:gameId/addreview" element={<AddReviewPage />} />
        <Route
          path="/games/:gameId/reviews/:reviewId"
          element={<ReviewDetailPage />}
        />
        <Route
          path="/games/:gameId/updatereview/:reviewId"
          element={<UpdateReviewPage />}
        />
        <Route path="/games/:gameId/reviews" element={<GameReviewsPage />} />

        <Route
          path="/profile/:userId"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:userId/reviews"
          element={
            <PrivateRoute>
              <UserReviewsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:userId/wishlist"
          element={
            <PrivateRoute>
              <WishlistPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:userId/games"
          element={
            <PrivateRoute>
              <OwnedGamesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:userId/invoices"
          element={
            <PrivateRoute>
              <UserInvoicesPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/admin"
          element={
            <PrivateRoute>
              <AdminDashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/dev"
          element={
            <PrivateRoute>
              <GameDevDashboardPage />
            </PrivateRoute>
          }
        />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
