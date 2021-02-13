const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const flash = require("connect-flash");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(flash());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB works");
});

const songsRouter = require("./routes/songs");

app.use("/songs", songsRouter);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
