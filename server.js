/*************************************************************************************
* WEB322 - 2227 Project
* I declare that this assignment is my own work in accordance with the Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Student Name  : Shiavm Sangwan
* Student ID    : 104419213
* Course/Section: WEB322/NEE
*
**************************************************************************************/

const path = require("path");
var HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const meals = require("./models/mealkit-db");
app.use(express.static("assets"));

app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main"
 }));
app.set("view engine", ".hbs");


app.get("/", (req, res) => {
res.render("general/home",{
    mealkit: meals.getTopMealkits()});
});

app.get("/log-in", (req, res) => {
res.render("general/login");
});

app.get("/sign-up", (req, res) => {
res.render("general/signup");
});

app.get("/on-the-menu", (req, res) => {
res.render("general/onthemenu",{
    mealcat: meals.getMealkitsByCategory()});
});




app.use((req, res) => {
    res.status(404).send("Page Not Found");
});


app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});

function onHttpStart() {
console.log("Express http server listening on: " + HTTP_PORT);
}
app.listen(HTTP_PORT,onHttpStart);