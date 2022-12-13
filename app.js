//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var items = ["buy food", "eat food", "cook food"];

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
  items.push(item);
  console.log(item);
  res.redirect("/");
});

app.listen(3000, () => console.log("server 3000 is up"));
