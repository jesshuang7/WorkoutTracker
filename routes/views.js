// functions to get exercises 
// send files to html
const express = require("express");
const router = express.Router();
const path = require('path');



// exercise html
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
    // res.render("exercise")
})

// stas html
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"))
})
    
//index.html
// router.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../public/index.html"))
// })

module.exports = router;