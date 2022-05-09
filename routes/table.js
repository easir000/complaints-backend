var express = require("express");
var tableRouter = express.Router();
var bodyParser = require("body-parser");
var authenticate = require("../authenticate");
var Tables = require("../models/tables");
var Logs = require("../models/logs.js");
tableRouter.use(bodyParser.json());


tableRouter.get("/", authenticate.verifyUser, (req, res, next) => {
  Tables.find({ user: req.user._id })
    .populate("user")
    .then(
      (tables) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        var results = {};
        results["results"] = tables;
        results["count"] = tables.length;
        res.json(results);
      },
      (err) => next(err)
    )
    .catch((err) => {
      next(err);
    });
});

tableRouter
  .post("/", authenticate.verifyUser, (req, res, next) => {
    req.body.user = req.user._id;
    Tables.create(req.body)
      .then(
        (table) => {
          if (table) {
            Tables.findById(table._id)
              .populate("user")
              .then(
                (populatedTable) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(populatedTable);
                },
                (err) => next(err)
              )
              .catch((err) => {
                next(err);
              });
          } else {
            var err = new Error();
            err.statusCode = 500;
            next(err);
          }
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {
        next(err);
      });
  })
  .delete("/", authenticate.verifyUser, (req, res, next) => {
    var err = new Error(
      "DELETE Operation not supported on '/tables' end point"
    );
    err.statusCode = 405;
    next(err);
  })
  .put("/", authenticate.verifyUser, (req, res, next) => {
    var err = new Error("PUT Operation not supported on '/tables' end point");
    err.statusCode = 405;
    next(err);
  });



module.exports = tableRouter;
