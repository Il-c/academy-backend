var express = require("express");
var router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", function (req, res) {
  res.send("router");
});
// define the about route
router.get("/akuankka", function (req, res) {
  res.send("akuankka");
});

module.exports = router;
