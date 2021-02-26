const express = require("express");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");

var mikkihiirirouter = require("./routes/mikkihiiri.js");
var locationsrouter = require("./routes/locations.js");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
/*app.use((req, res, next) => {
  console.log(req.method);
  console.log(req.body);
  if (
    -90 > req.body.latitude ||
    req.body.latitude > 90 ||
    req.body.longitude < -180 ||
    req.body.longitude > 180 ||
    !req.body.latitude ||
    !req.body.longitude
  ) {
    console.log("Invalid coordinates");
    res.status(400);
    res.end();
  } else {
    next();
  }
});*/

app.use("/api/locations", locationsrouter);
app.use("/mikkihiiri", mikkihiirirouter);

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
