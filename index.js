var express = require('express');
var wyd = express();

wyd.get('/', function(req, res){
  res.send('hello world');
});


wyd.listen(9000);