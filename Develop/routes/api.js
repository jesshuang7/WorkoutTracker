const express = require("express");
const db = require("./models");
const app = express();

app.post("/api/workouts", ({ body }, res) => {
    const workout = body
    db.Workout.insert(workout, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
          } else {
            res.json(result);
          }
    })
  });

  app.post("/api/workouts/:id", (req, res) => {
    const id = req.params.id
    db.Workout.update({
      _id: mongojs.ObjectId(id)
    }, {
    //   $set: {
    //     title: req.body.title, 
    //     note: req.body.note, 
    //     modified: Date.now()
    //   }
    }, (err, data) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json(data);
      }
    });
  })


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