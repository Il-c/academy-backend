var express = require("express");
var router = express.Router();
const database = require("../database/crudrepository.js");
const { body, validationResult } = require("express-validator");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", function (req, res) {
  res.json(database.findAll());
});

router.get("/pretty", function (req, res) {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(database, null, 2));
});

router.get("/:id", function (req, res) {
  let response = database.findById(req.params.id);
  response == undefined && res.status(404);
  res.send(response);
});

router.delete("/:id", function (req, res) {
  //let newDB = database.filter((i) => i.id !== Number(req.params.id));
  let response = database.deleteById(req.params.id);
  res.status(response ? 204 : 404);
  res.send();
});

router.post(
  "/",
  body("latitude").isInt({ min: -90, max: 90 }).not().isEmpty(),
  body("longitude").isInt({ min: -180, max: 180 }).not().isEmpty(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let newLoc = req.body;
    let response = database.addItem(newLoc);
    res.setHeader(
      "Location",
      req.protocol +
        "://" +
        req.get("host") +
        req.baseUrl +
        req.path +
        response.id
    );
    res.status(201);
    res.body = response;
    res.send(response);
  }
);

router.put(
  "/:id",
  body("latitude").isInt({ min: -90, max: 90 }).not().isEmpty(),
  body("longitude").isInt({ min: -180, max: 180 }).not().isEmpty(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let newLoc = req.body;
    let response = database.updateItem(newLoc, req.params.id);
    res.setHeader(
      "Location",
      req.protocol + "://" + req.get("host") + req.baseUrl + req.path
    );
    res.status(201);
    res.body = response;
    res.send(response);
  }
);

module.exports = router;
