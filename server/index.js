// start your server and attach any middleware here

const express = require("express");
const app = express();
const PORT = 8081;

// init cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser("secret"));

const client = require("./db/client");
// Connect to client
client.connect();

// init morgan
const morgan = require("morgan");
app.use(morgan("dev"));

// init body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// init cors
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Router: /api
app.use("/api", require("./api"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
