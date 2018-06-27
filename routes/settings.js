var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('settingsBS', { title: 'Settings' });
});


// router.get('/',function(req,res,next){
//   console.log("inside get square");
//   res.render("square",{x:0,square:0,squares:[]})
// })

router.post('/',function(req,res,next){
  console.log("post new name info");
  const firstname = req.body.firstName
  const lastname = req.body.lastName
  const username = req.body.username
  //database.squares.push(firstname)
  //fs.writeFileSync('../database/data.json',JSON.stringify(database,null,' '));
  console.log(firstname)
  console.log(lastname)
  console.log(username)
  res.render('settingsBS', { title: 'Settings' ,firstname:firstname});
})

module.exports = router;
