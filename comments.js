//create web server
const express = require("express");
const app = express();
//connect to mongodb
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
//create port
const port = process.env.PORT || 5000;
//create route
app.get("/", (req, res) => res.send("Hello World"));
//listen to port
app.listen(port, () => console.log(`Server is running on port ${port}`));