var express = require("express");
var router = express.Router();
let database = [
  { id: 1, latitude: 60, longitude: 70 },
  { id: 2, latitude: 40, longitude: 80 },
];

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", function (req, res) {
  res.json(database);
});

router.get("/pretty", function (req, res) {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(database, null, 2));
});

router.get("/1", function (req, res) {
  res.send(database[0]);
});

module.exports = router;
