var express = require("express");
var app = express();
const port = process.env.PORT || 3000;

let database = [
  { id: 1, latitude: 60, longitude: 70 },
  { id: 2, latitude: 40, longitude: 80 },
];

app.use(express.static("public"));

app.get("/api/locations", function (req, res) {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(database, null, 2));
});
app.get("/api/locations/ugly", function (req, res) {
  res.send(JSON.stringify(database, null, 2));
});
app.get("/json", function (req, res) {
  res.json("fetch all locations");
});
app.get("/json1", function (req, res) {
  res.send({ koe: "fetch all locations" });
});
app.get("/json2", function (req, res) {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(database, null, 2));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

console.log("Moikka moi!");
