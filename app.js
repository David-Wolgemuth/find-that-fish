
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "/client")));
app.use(express.static(path.join(__dirname + "/bower_components")));

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

app.get("/species/:id", function (req, res) {
    var id = req.params.id;
    fish.speciesById(id, function (data) {
        res.json(data);
    });
});

app.get("/species", function (req, res) {
    var id = req.query.family;
    fish.speciesByFamilyId(id, function (species) {
        res.json(species);
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Running on Port:", port);
});
