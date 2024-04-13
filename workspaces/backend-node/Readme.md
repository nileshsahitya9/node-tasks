# Project Directory Structure

## Overview

Our project follows a modular directory structure, organizing different functionalities into separate folders for clarity and maintainability.

### `components`

Contains individual files for API endpoints, grouped by functionality:
- Each endpoint has its own file and exports a handler function.

### `core`

Holds core functionalities used throughout the application:
- Includes essential functions like `withSchema` for request validation.

### `loaders`

Initializes important components like Redis and Prisma:
- `index.ts` implements a retry mechanism for connecting to components.
- `prisma.ts` configures and exports a Prisma client instance with query logging.

### `services`

Manages various services used in the application:
- `redis.ts` manages connections to Redis and offers utility functions.
- `token.ts` handles JWT token generation and device token management using Prisma.

### `utils`

Contains utility functions and helpers:
- `withCache.ts` implements a caching mechanism using Redis.
- `withStaleWhileRevalidate.ts` implements a caching strategy called "Stale-While-Revalidate."

### `config.ts`

Specifies configuration settings for the application:
- Includes parameters like port number, JWT_SECRET, host, and passwords.

## Key Components

Our application utilizes API versioning and includes essential endpoints and a structured database schema.

### Endpoints

Endpoints are organized under `components`:
- `/api/v1/login` and `/api/v1/signup` handle user authentication and registration securely.
- `/api/v1/posts/create` allows users to create new posts with varying visibility settings.
- `/api/v1/posts/feed` retrieves a user's feed based on followers and post visibility.
- `/api/v1/users/:id/follow` enables users to follow other users.

Authentication is required for accessing certain endpoints, enforced by an `authRequiredHook` pre-handler in `v1.ts`.

### Database Schema

Our database schema includes tables for users, device tokens, follows, and posts:
- Tables are structured with necessary constraints and foreign keys for data integrity.
### Improvements

1. **Error Handling:**
   a. Error handling mechanisms throughout controllers and services to gracefully manage unexpected errors and provide meaningful responses to users.
   b. use of try-catch
   c. logging in case of errors helps in debugging
2. **Validation**
   a. Ensure that the request body validation accurately captures the expected input.
   b. Middleware implementation before controller
3. **Structure**
   a. Centralized place for proper response structure
   b. Constants and utils file
4. **Testing**
   a. Develope unit tests and integration tests to validate the functionality of different components, ensuring code reliability and minimizing the risk of regressions. 
5. **Security**
   a. Storing sensitive data like JWT secrets in a separate .env file using environment variables.
   b. Rate limiting
