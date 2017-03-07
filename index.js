var express = require('express');
var wyd = express();

var bodyParser = require('body-parser')

var pollTemplate = {
  "response_type": "in_channel",
  "text": "",
  "replace_original": true,
  "attachments": [
    { "callback_id": "confirm",
      "actions": [
        {
          "name": "confirm",
          "text": "confirm",
          "type": "button",
          "value": "confirm",
	  "style": "primary"
        }
      ]
    },
    { "text": ":thumbsup:  :question:  :thumbsdown:" }
  ]
}


wyd.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

wyd.post('/', function(req, res){
  var args = req.body.text.split(" ");
  console.log(args);

  pollTemplate.text = "*what:* " + args[3] + "\n*when:* " + args[0] + " at " + args[1] + "\n*where:* " + args[2] + "\n" 

  res.send(pollTemplate)
});

wyd.post("/confirm", function(req, res) {
  var message = JSON.parse(req.body.payload);
  console.log(message.original_message);
 	
  res.send("ok");
})


wyd.listen(80, function () {
  console.log('wyd listening on port 9000!')
})


