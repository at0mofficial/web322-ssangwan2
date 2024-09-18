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

const dotenv = require("dotenv");
dotenv.config({path: "./key.env"});

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

app.get("/welcome", (req, res) => {
    if (req.query.user) {
        res.render("general/welcome",{
            value: req.query.user});
    }
    else {
        res.redirect("/");
    }
    });

app.get("/log-in", (req, res) => {
res.render("general/login");
});

app.post("/log-in", (req, res) => {
    let errorMessage = {};
    let passedValidation = true;
    if (typeof req.body.username !=="string" || req.body.username.trim().length < 1){
        errorMessage.username = "*This Field can't be empty";
        passedValidation = false;
    }
    if (typeof req.body.password !=="string" || req.body.password.length < 1){
        errorMessage.password = "Password can't be empty";
        passedValidation = false;
    }

    if (!passedValidation) {
        res.render("general/login",{
            values: req.body,
            errorMessage
        })
    }
    else {
        res.render("general/login")
    }

});

app.get("/sign-up", (req, res) => {
res.render("general/signup");
});

app.post("/sign-up", (req, res) => {

    
    const {username, email, ipass, cpass} = req.body;
    let passedValidation = true;
    let errorMessage = {};
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]/;
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const checkPassword=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,12}$/;
  
    if (typeof username !=="string" || username.trim().length < 3 || username.trim().length > 25){
        passedValidation = false;
        errorMessage.username = "*Username must be 3 to 25 characters long"
    }
    else if(specialChars.test(username)){
        passedValidation = false;
        errorMessage.username = "*No spaces or special characters allowed!"
    }
    // \d is range of number from 0-9
    else if(/^\d/.test(username)){
        passedValidation = false;
        errorMessage.username = "*Username must start with a letter"
    }
    
    if(!validEmail.test(email)){
        passedValidation = false;
        errorMessage.email = "*Enter a valid email address"
    }
        // To check a password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
    if(!ipass.match(checkPassword)){
        passedValidation = false;
        errorMessage.ipass = "Password must be between 8 to 15 characters and muct contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character ";
    }
    
     
    if (cpass != ipass){
        passedValidation = false;
        errorMessage.cpass = "Passwords don't match!"
    }

    if(passedValidation){
        // console.log(process.env.SENDGRID_API_KEY)
        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: String(req.body.email),
            from: "ssangwan2@myseneca.ca",
            subject: "Sign-up Confirmation",
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };

        sgMail.send(msg)
            .then(() => {
                // req.body.set('user', req.body.username)
                res.redirect(`/welcome?user=${req.body.username}`);
            })
            .catch((error) => {
                console.log(error);
                res.render("general/signup",{
                    values: req.body,
                    errorMessage
                });
            });

        // res.send("PassedValidation");
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