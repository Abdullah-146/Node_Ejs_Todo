//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var items = ["buy food", "eat food", "cook food"];
var works = [];

app.set("view engine", "ejs");
app.get("/", function (req, res) {
  var today = new Date();
  var day = "";
  var options = { weekday: "long", day: "numeric", month: "long" };
  day = today.toLocaleDateString("en-US", options);
  res.render("list", { kindofday: day, newone: items });
});

app.post("/", (req, res) => {
  var item = req.body.newItem;
  if (req.body.list === "work") {
    works.push(item);
    res.redirect("/work");
  } else {
    items.push(item);

    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { kindofday: "work", newone: works });
});
app.listen(3000, () => console.log("server 3000 is up"));
