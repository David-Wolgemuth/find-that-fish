
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "/client")));

var fish = require("./fish-scraper.js");

app.get("/classes", function (req, res) {
    fish.classes(function (classes) {
        res.json(classes);
    });
});

app.get("/orders", function (req, res) {
    var id = req.query.class;
    fish.ordersByClassId(id, function (orders) {
        res.json(orders);
    });
});

app.get("/families", function (req, res) {
    var id = req.query.order;
    fish.familiesByOrderId(id, function (families) {
        res.json(families);
    });
});

app.get("/species", function (req, res) {
    var id = req.query.family;
    fish.speciesByOrderId(id, function (species) {
        res.json(species);
    });
});

app.listen(5000, function () {
    console.log("Running on Port 5000");
});
