# GameStore Frontend

Welcome to the GameStore frontend! This README provides an overview of the frontend components and how to use them to interact with the GameStore API.

## Components

### Authentication
- **Sign Up**: Allows users to create a new account.
- **Login**: Enables users to log in to their existing account.

### OTP (One-Time Password)
- **Generate OTP**: Generates a one-time password for user verification.
- **Verify OTP**: Allows users to verify the one-time password received.
- **Validate OTP**: Validates the one-time password entered.
- **Disable OTP**: Disables the one-time password feature for the user.
- **Verify Token**: Verifies the user's authentication token.

### Games
- **Browse Games**: View all available games.
- **Game Details**: View details of a specific game.
- **Search Game**: Search for a game by title.
- **Add Game**: Allows developers to add a new game.
- **Edit Game**: Allows developers to edit details of an existing game.
- **Delete Game**: Allows developers to remove a game from the store.

### Invoices
- **Fulfill Invoice**: Fulfill an invoice for a specific order.
- **User Invoices**: View invoices for the authenticated user.
- **All Invoices**: View all invoices.
- **Developer Invoices**: View invoices for developers.
- **Admin Invoices**: View invoices for admins.

### Reviews
- **Game Reviews**: View reviews for a specific game.
- **User Reviews**: View reviews posted by a specific user.
- **All Reviews**: View all reviews.
- **Review Details**: View details of a specific review.
- **Post Review**: Allows users to post a review for a specific game.
- **Edit Review**: Allows users to edit their own reviews.
- **Delete Review**: Allows users to delete their own reviews.

### Users
- **User Details**: View details of the authenticated user.
- **Buy Game**: Buy a game and add it to the user's library.
- **Wishlist Game**: Add a game to the user's wishlist.
- **Remove from Wishlist**: Remove a game from the user's wishlist.
- **Add to Cart**: Add a game to the user's shopping cart.
- **Remove from Cart**: Remove a game from the user's shopping cart.
- **User Roles**: View roles assigned to the user.
- **Update User Roles**: Allows administrators to update roles for users.

## Getting Started

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Start the development server using `npm start`.
4. Navigate to the appropriate routes in the application to interact with the GameStore API.

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **React Router**: Library for declarative routing in React applications.
- **Axios**: HTTP client for making requests to the backend API.
- **JWT (JSON Web Tokens)**: For user authentication and authorization.

## Contributing

Contributions to the GameStore frontend are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request on GitHub.

## License

This project is licensed under the [MIT License](LICENSE).
