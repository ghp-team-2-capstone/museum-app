const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, COOKIE_SECRET } = require("../secrets");
const SALT_ROUNDS = 10;

const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
} = require("../db/helpers/users");

router.use(express.json());

// POST - /api/users/register - register route

router.post("/register", async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    console.log(typeof password);
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log(hashedPassword);
    // sending username and hashed password to database
    const user = await createUser({
      username,
      password: hashedPassword,
    });
    console.log(user);

    // remove password from user object for security reasons
    delete user.password;

    // create the token
    const token = jwt.sign(user, JWT_SECRET);

    // attach cookie to response, using the token that we created
    // sameSite - strict same site enforcement (have to be at exact same web address for cookie to persist
    // httpOnly - the cookie can only be used in http
    // signed -

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    delete user.password;
    // console.log(token);
    res.send({ token, user });
  } catch (error) {
    next(error);
  }
});

// POST - api/users/login - log in to your account

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log({ username, password });
    const user = await getUserByUsername(username);
    console.log(user);
    const validPassword = await bcrypt.compare(password, user.password);
    // same cookie and token info from register (Above), only checking if valid password
    if (validPassword) {
      const token = jwt.sign(user, JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });

      delete user.password;

      res.send({ token, user });
      return token;
    }
  } catch (error) {
    next(error);
  }
});

//  - api/users/logout - logout of account
router.post("/logout", async (req, res, next) => {
  try {
    // clear token and properties created above
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    // confirm you logged out
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
});

const users = require("../db/seedData");

// GET all users - api/users

router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

// GET user by id - api/users/:userId

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// GET user by username - api/users/:username

router.get("/user/:username", async (req, res, next) => {
  try {
    const user = await getUserByUsername(req.params.username);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
