# godown inventory Backend

A Node.js backend API for a social media platform with user authentication, content creation, and social features.

## Setup Instructions

1. Install dependencies:

    ```bash
    npm install
    ```

2. Create a `.env` file in the root directory with the following variables:

    ```
    PORT=6213
    DB_HOST=godown-inventory.cshe0kko04jx.us-east-1.rds.amazonaws.com
    DB_PORT=5432
    DB_NAME=inventory
    DB_USER=postgres
    DB_PASSWORD=postgres
    JWT_SECRET=priyanshu
    ```

3. Set up PostgreSQL database and run the setup script:
    ```bash
    npm run setup:db
    ```

## How to Run

### Development mode with auto-reload:

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

## Available npm Scripts

-   `npm start` - Start the application in production mode
-   `npm run dev` - Start the application in development mode with nodemon
-   `npm run start:verbose` - Start with verbose logging
-   `npm run start:critical` - Start with critical-only logging
-   `npm run setup:db` - Set up database tables
