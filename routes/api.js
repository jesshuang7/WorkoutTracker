const mongoose = require("mongoose");
const router = require("express").Router();
const Workout = require("../models/Workout.js");

// POST 
router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });

// GET workouts
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $set: {
                totalDuration: {$sum: "$exercises.duration"}
            }
        }
        ]).then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });

    
// GET workouts/range
//  use agregate 
router.get("/api/workouts/range", (req, res) => {
    console.log("workout range")
    Workout.aggregate([
        {
            $set: {
                totalDuration: {$sum: "$exercises.duration"}
            }
        }
    ]).sort({day: -1}).limit(7).sort({day:1})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });


// PUT route /api/workouts/:id
router.put("/api/workouts/:id", (req, res) => {
    const id = req.params.id
    Workout.findOneAndUpdate({_id: id}, {
      $push: {
        exercises: req.body, 
      }
    }, (err, data) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json(data);
      }
    });
  })    

module.exports = router;

   