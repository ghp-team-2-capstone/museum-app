// drop tables

// create tables

// create initial items

// rebuild db

const client = require("./client");
const { createMuseum } = require("./helpers/museums");
const { createReview } = require("./helpers/reviews");
const { createUser } = require("./helpers/users");
const { createJournal } = require("./helpers/journal"); // Corrected
const { createFavorite } = require("./helpers/favorites");
const { users, museums, reviews, journal, favorites } = require("./seedData");

//Drop Tables for cleanliness
const dropTables = async () => {
  try {
    console.log("Starting to drop tables");
    await client.query(`
        DROP TABLE IF EXISTS journal;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS favorites;
        DROP TABLE IF EXISTS museums;
        DROP TABLE IF EXISTS users;

        `);
    console.log("Tables dropped!");
  } catch (error) {
    console.log("Error dropping tables");
    throw error;
  }
};

const createTables = async () => {
  console.log("Building tables...");
  await client.query(`
        CREATE TABLE users (
          "userId" SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL
        );

        CREATE TABLE museums (
          "museumId" SERIAL PRIMARY KEY,
          "museumName" varchar(255) NOT NULL,
          image varchar(500),
          description varchar(1000) NOT NULL,
          link varchar(500),
          type varchar(255) NOT NULL,
          lat DECIMAL(10, 6) NOT NULL,
          lng DECIMAL(10, 6) NOT NULL
        );

        CREATE TABLE reviews (
          "reviewId" SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users("userId"),
          "museumId" INTEGER REFERENCES museums("museumId"),
          rating INTEGER,
          body varchar(1000),
          date DATE NOT NULL DEFAULT CURRENT_DATE

        );

        CREATE TABLE journal (
          "entryId" SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users("userId"),
          title varchar(1000),
          body varchar(1000),
          date DATE NOT NULL DEFAULT CURRENT_DATE
      );
        CREATE TABLE favorites (
          "favoriteId" SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users("userId") NOT NULL,
          "museumId" INTEGER REFERENCES museums("museumId") NOT NULL
      );
    `);
  console.log("Tables built!");
};

const createInitialUsers = async () => {
  try {
    for (const user of users) {
      await createUser(user);
    }
    console.log("created users");
  } catch (error) {
    throw error;
  }
};

const createInitialMuseums = async () => {
  try {
    for (const museum of museums) {
      await createMuseum(museum);
    }
    console.log("created museums");
  } catch (error) {
    throw error;
  }
};

const createInitialReviews = async () => {
  try {
    for (const review of reviews) {
      await createReview(review);
    }
    console.log("created reviews");
  } catch (error) {
    throw error;
  }
};

const createInitialJournal = async () => {
  try {
    for (const entry of journal) {
      await createJournal(entry);
    }
    console.log("created journal");
  } catch (error) {
    throw error;
  }
};

const createInitialFavorites = async () => {
  try {
    for (const favorite of favorites) {
      await createFavorite(favorite);
    }
    console.log("created favorites");
  } catch (error) {
    throw error;
  }
};

const rebuildDb = async () => {
  try {
    //ACTUALLY connect to my local database
    client.connect();
    //Run our functions
    await dropTables();
    await createTables();

    //Generating starting data
    console.log("starting to seed...");
    await createInitialUsers();
    await createInitialMuseums();
    await createInitialReviews();
    await createInitialJournal();
    await createInitialFavorites();
  } catch (error) {
    console.error(error);
  } finally {
    //close our connection
    client.end();
  }
};

rebuildDb();
