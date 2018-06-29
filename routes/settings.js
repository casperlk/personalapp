var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  if (res.locals.loggedIn) {
    res.render('settingsBS', { title: 'Settings' });
  } else {
    res.render('indexBS', { title: "Tic Tac Toe"})
  }
});


router.post('/',function(req,res,next){
  console.log("post new name info");
  const firstname = req.body.firstName
  const lastname = req.body.lastName
  const wowok = req.body.username
  //database.squares.push(firstname)
  //fs.writeFileSync('../database/data.json',JSON.stringify(database,null,' '));
  console.log(firstname)
  console.log(lastname)
  console.log(username)
  res.render('settingsBS', { title: 'Settings' ,firstname:firstname});
})

module.exports = router;
