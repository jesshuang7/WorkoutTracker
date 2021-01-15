// const express = require("express");
// const db = require("./models");
// const app = express();

// app.post("/api/workouts", ({ body }, res) => {
//     const workout = body
//     db.Workout.insert(workout, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.send(err);
//           } else {
//             res.json(result);
//           }
//     })
//   });

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
    Workout.find([
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

    // app.post("/submit", ({ body }, res) => {
    //     db.Note.create(body)
    //       .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
    //       .then(dbUser => {
    //         res.json(dbUser);
    //       })
    //       .catch(err => {
    //         res.json(err);
    //       });
    //   });




//   app.get("/all", (req, res) => {
//     db.notes.find({}, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.send(err);
//       } else {
//         res.json(result);
//       }
//     })
//   })


// app.get("/find/:id", (req, res) => {
//     const id = req.params.id
//     db.notes.findOne({_id:mongojs.ObjectId(id)}, (err, data) => {
//       if (err) {
//         console.log(err);
//         res.send(err);
//       } else {
//         res.json(data);
//       }
//     });
//   });


//   app.delete("/delete/:id", (req, res) => {
//     const id = req.params.id
//     db.notes.remove({
//       _id: mongojs.ObjectId(id)
//     }, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.send(err);
//       } else {
//         res.json(result);
//       }
//     })
//   })

//   app.delete("/clearall", (req, res) => {
//     db.notes.remove({}, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.send(err);
//       } else {
//         res.json(result);
//       }
//     });
//   })