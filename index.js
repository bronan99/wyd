'use strict'
var express = require('express');
var wyd = express();

var bodyParser = require('body-parser')

var pollTemplate = {
  "response_type": "in_channel",
  "text": "",
  "replace_original": true,
  "attachments": [
    {
      "callback_id": "confirm",
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

var confirmTemplate = {
  "response_type": "in_channel",
  "text": "",
  "replace_original": true,
}


wyd.use(bodyParser.urlencoded({     
  extended: true
}));

wyd.post('/', function (req, res) {
  var args = req.body.text.split(" ");
  console.log(args);

  pollTemplate.text = "*what:* " + args[3] + "\n*when:* " + args[0] + " at " + args[1] + "\n*where:* " + args[2] + "\n"

  res.send(pollTemplate)
});

wyd.post("/confirm", function (req, res) {
  //var message = JSON.parse(req.body.payload);

  confirmTemplate.text = generateConfirmMessage(req.body.payload);
  res.send(confirmTemplate);
})

wyd.listen(80, function () {
  console.log('wyd listening on port 9000!')
})

var generateConfirmMessage = function(msg) {
  var team = message.team.domain;
  var text = message.original_message.text.replace(/\r?\n/g, ":").split(":");

  var eventName = text[1].trim();
  var location = text[5].trim();
  var datetime = text[3].trim().split(" ");
  var day = datetime[0];
  var time = datetime[2];

  return "*Confirmed:* *" + eventName + "*\n" + day + " at " + time + "\n" + location; 
}

