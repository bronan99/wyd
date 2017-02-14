var express = require('express');
var wyd = express();

var bodyParser = require('body-parser')

var pollTemplate = {
  "response_type": "in_channel",
  "text": "",
  "attachments": [
    {"text": ":thumbsup:  :question:  :thumbsdown:"}
  ]
}

wyd.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

wyd.post('/', function(req, res){
  var args = req.body.text.split(" ");
  console.log(args);

  pollTemplate.text = args[3] + "\n" + args[0] + " at " + args[1] + "\n" + args[2] + "\n" 

  res.send(pollTemplate)
});


wyd.listen(80, function () {
  console.log('wyd listening on port 9000!')
})
