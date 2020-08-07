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

  let titleArray = (await getAllFilms()).map(film => film.title);
  res.render("getFilms", {renderedTitles: titleArray});

  // When I run GET on POSTMAN and console.log these lines of code it works
  // But how do I use what these functions return
  console.log( getAllFilms() );
  // console.log( getPeople() );
  //console.log( getSpecies() );


  const getPeople = (pos) =>{
    return fetch(
      baseURL + '/people',
      {method: 'GET'}
    )
    .then( response => response.json() )
    .then( people => console.log(people) )
    .catch( error => console.error('error:', error) );
  };

  const getSpecies = (pos) =>{
    return fetch(
      baseURL + '/species',
      {method: 'GET'}
    )
    .then( response => response.json() )
    .then( species => console.log(species.length) )
    .catch( error => console.error('error:', error) );
  };
});

app.listen(3000, function(){
  console.log("app.js started listening to PORT 3000.");
});
