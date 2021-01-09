// functions to get exercises 
// send files to html
const express = require("express");
const app = express();
const db = require("../models");


// exercise html
app.get("/exercise"), (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    })
}

// stas html
app.get("/stats"), (req, res) => {
    res.render("stats")
}