var express = require("express");
var router = express.Router();
const database = require("../database/mysqlcrudrepository.js");
const { body, validationResult } = require("express-validator");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", async function (req, res) {
  try {
    let locations = await database.findAll();
    console.log(locations);
    res.json(locations);
  } catch (err) {
    console.log(err);
  }
});

router.get("/pretty", function (req, res) {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(database, null, 2));
});

router.get("/:id", async function (req, res) {
  try {
    let locations = await database.findById(req.params.id);
    console.log(locations);
    res.json(locations);
  } catch (err) {
    console.log(err);
    res.status(404);
    res.end();
  }
});

router.delete("/:id", async function (req, res) {
  try {
    let response = await database.deleteById(req.params.id);
    console.log(response);
    res.status(204);
    res.send();
  } catch (err) {
    console.log(err);
    res.status(404);
    res.end();
  }
});

router.post(
  "/",
  body("latitude").isInt({ min: -90, max: 90 }).not().isEmpty(),
  body("longitude").isInt({ min: -180, max: 180 }).not().isEmpty(),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let newLoc = req.body;
    try {
      let response = await database.addItem(newLoc);
      console.log(response);
      res.setHeader(
        "Location",
        req.protocol +
          "://" +
          req.get("host") +
          req.baseUrl +
          req.path +
          response
      );
      res.status(201);
      res.body = response;
      res.send();
    } catch (err) {
      console.log(err);
      res.status(404);
      res.end();
    }

    /*
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
    res.send(response);*/
  }
);

router.put(
  "/:id",
  body("latitude").isInt({ min: -90, max: 90 }).not().isEmpty(),
  body("longitude").isInt({ min: -180, max: 180 }).not().isEmpty(),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let newLoc = req.body;

    try {
      let response = await database.updateItem(newLoc, req.params.id);
      console.log(response);
      res.setHeader(
        "Location",
        req.protocol +
          "://" +
          req.get("host") +
          req.baseUrl +
          req.path +
          response
      );
      res.status(201);
      res.body = response;
      res.send();
    } catch (err) {
      console.log(err);
      res.status(404);
      res.end();
    }

    /*
    let response = database.updateItem(newLoc, req.params.id);
    res.setHeader(
      "Location",
      req.protocol + "://" + req.get("host") + req.baseUrl + req.path
    );
    res.status(201);
    res.body = response;
    res.send(response);*/
  }
);

module.exports = router;
