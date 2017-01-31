var express = require('express');
var wyd = express();

var bodyParser = require('body-parser')

wyd.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

wyd.post('/', function(req, res){
  console.log(req.body.text)
  res.send("hello world")
});


wyd.listen(80, function () {
  console.log('wyd listening on port 9000!')
})
