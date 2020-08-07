//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fetch = require("node-fetch");
const ejs = require("ejs");

const app = express();

let titleArray = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

const baseURL = "https://ghibliapi.herokuapp.com";


app.get("/", function(req, res){

  res.render("home");

}); // ends app.get()

app.get("/getFilms", async function(req, res){

  const getAllFilms = async (pos) =>{
    const response = await fetch(baseURL + '/films', {method: 'GET'})
        .catch(error => console.error('error:', error));

    return await response.json();
  };

  // const titleArray = (await getAllFilms()).map(film => film.title);
  const ghibliFilms = ( await getAllFilms() );
  res.render("getFilms", {renGhibliFilms: ghibliFilms});

});

app.listen(3000, function(){
  console.log("app.js started listening to PORT 3000.");
});
