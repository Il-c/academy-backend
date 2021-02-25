const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

var mikkihiirirouter = require("./routes/mikkihiiri.js");
var locationsrouter = require("./routes/locations.js");

app.use(express.static("public"));

app.use("/api/locations", locationsrouter);
app.use("/mikkihiiri", mikkihiirirouter);

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
