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

// setting body-parser
app.use(express.urlencoded({extended: false}));

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

app.post("/sign-up", (req, res) => {
    // const {username, email, ipaass, cpass} = req.body;
    console.log(req.body);
    
    const {username, email, ipass, cpass} = req.body;
    let passedValidation = true;
    let errorMessage = {};
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]/;
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const checkPassword=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  
    if (typeof username !=="string" || username.trim().length < 3 || username.trim().length > 25){
        passedValidation = false;
        errorMessage.username = "*Username must be 3 to 25 characters long"
    }
    else if(specialChars.test(req.body.username)){
        passedValidation = false;
        errorMessage.username = "*No spaces or special characters allowed!"
    }
    // \d is range of number from 0-9
    else if(/^\d/.test(req.body.username)){
        passedValidation = false;
        errorMessage.username = "*Username must start with a letter"
    }
    
    if(!validEmail.test(req.body.email)){
        passedValidation = false;
        errorMessage.email = "*Enter a valid email address"
    }
        // To check a password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
    if(!req.body.ipass.match(checkPassword)){
        passedValidation = false;
        errorMessage.ipass = "Password must be between 8 to 15 characters and muct contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character ";
    }
    // else if(!req.body.cpass.match(checkPassword)){
    //     passedValidation = false;
    //     errorMessage.cpass = "Password must be between 8 to 15 characters and muct contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character ";
    // }
     
    if (req.body.cpass != req.body.ipass){
        passedValidation = false;
        errorMessage.cpass = "Passwords don't match!"
    }

    if(passedValidation){
        res.send("PassedValidation");
    }
    else{
        res.render("general/signup",{
            values: req.body,
            errorMessage
        });
    }
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