//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fetch = require("node-fetch");
const ejs = require("ejs");

const app = express();

let pageTitle = "";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

const baseURL = "https://ghibliapi.herokuapp.com";


app.get("/", function(req, res){

  pageTitle = "home";

  res.render("home", {renPageTitle: pageTitle});

}); // ends app.get()

app.get("/getFilms", async function(req, res){

  pageTitle = "getFilms";

  const getAllFilms = async (pos) =>{
    const response = await fetch(baseURL + '/films', {method: 'GET'})
        .catch(error => console.error('error:', error));

    return await response.json();
  };

  const ghibliFilms = ( await getAllFilms() );
  res.render("getFilms", {renGhibliFilms: ghibliFilms, renPageTitle: pageTitle});

});

app.listen(3000, function(){
  console.log("app.js started listening to PORT 3000.");
});
