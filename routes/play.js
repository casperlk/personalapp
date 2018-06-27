var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('play', { title: 'Tic Tac Toe' });
  res.render('TicTacToe', { title: 'Tic Tac Toe' });
});

module.exports = router;
