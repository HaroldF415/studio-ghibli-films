//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fetch = require("node-fetch");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const baseURL = "https://ghibliapi.herokuapp.com";


app.get("/", function(req, res){



}); // ends app.get()

app.post("/", function(req, res){

  const getAllFilms = (pos) =>{
    return fetch(
      baseURL + '/films',
      {method: 'GET'}
    )
    .then( response => response.json() )
    .then( films =>  films.forEach( function(obj){
      console.log(obj.title);
    }
    ) )
    .catch( error => console.error('error:', error) );
  };

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
