# Game Store API Documentation

This API provides endpoints for user authentication, game management, and review functionality.

## Authentication

### Login
- **Endpoint:** `POST /auth/login`
- **Description:** Log in with existing user credentials.
- **Request:**
  - Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "token": "your_access_token",
      "userId": "user_id"
    }
    ```

### Signup
- **Endpoint:** `POST /auth/signup`
- **Description:** Register a new user.
- **Request:**
  - Body:
    ```json
    {
      "username": "newuser",
      "email": "newuser@example.com",
      "password": "newpassword123"
    }
    ```
- **Response:**
  - Status: 201 Created
  - Body:
    ```json
    {
      "message": "User created successfully."
    }
    ```

## Games

### Get All Games
- **Endpoint:** `GET /api/games`
- **Description:** Retrieve a list of all games.
- **Response:**
  - Status: 200 OK
  - Body: Array of game objects

### Get a Specific Game
- **Endpoint:** `GET /api/games/:gameId`
- **Description:** Retrieve details of a specific game.
- **Response:**
  - Status: 200 OK
  - Body: Game object

### Create a New Game
- **Endpoint:** `POST /api/games`
- **Description:** Add a new game to the database.
- **Request:**
  - Body: Game object
- **Response:**
  - Status: 201 Created
  - Body: Created game object

### Update a Game
- **Endpoint:** `PUT /api/games/:gameId`
- **Description:** Update details of a specific game.
- **Request:**
  - Body: Updated game object
- **Response:**
  - Status: 200 OK
  - Body: Updated game object

### Delete a Game
- **Endpoint:** `DELETE /api/games/:gameId`
- **Description:** Delete a specific game.
- **Response:**
  - Status: 200 OK
  - Body: Deleted game object

## Reviews

### Get Reviews for a Game
- **Endpoint:** `GET /api/reviews/game/:gameId`
- **Description:** Retrieve all reviews for a specific game.
- **Response:**
  - Status: 200 OK
  - Body: Array of review objects

### Add a Review for a Game
- **Endpoint:** `POST /api/reviews/:gameId`
- **Description:** Add a new review for a specific game.
- **Request:**
  - Body: Review object
- **Response:**
  - Status: 201 Created
  - Body: Created review object

### Get All Reviews
- **Endpoint:** `GET /api/reviews`
- **Description:** Retrieve a list of all reviews.
- **Response:**
  - Status: 200 OK
  - Body: Array of review objects

### Get Reviews by User
- **Endpoint:** `GET /api/reviews/user/:userId`
- **Description:** Retrieve all reviews by a specific user.
- **Response:**
  - Status: 200 OK
  - Body: Array of review objects

### Get a Specific Review
- **Endpoint:** `GET /api/reviews/:reviewId`
- **Description:** Retrieve details of a specific review.
- **Response:**
  - Status: 200 OK
  - Body: Review object

### Update a Review
- **Endpoint:** `PUT /api/reviews/:reviewId`
- **Description:** Update details of a specific review.
- **Request:**
  - Body: Updated review object
- **Response:**
  - Status: 200 OK
  - Body: Updated review object

### Delete a Review
- **Endpoint:** `DELETE /api/reviews/:reviewId`
- **Description:** Delete a specific review.
- **Response:**
  - Status: 200 OK
  - Body: Deleted review object
