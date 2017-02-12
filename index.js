var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./lib/router.js');

app.use(bodyParser.json()); 
app.use(express.static('public'));

app.post('/publish', function (request, response) {
  var exchange = request.body.exchange;
  var ret = router.publish(exchange);
  if (ret.error == undefined) {
    response.status(200).send(ret);
  }
});

app.post('/subscribe', function (request, response) {
  var exchange = request.body.exchange;
  var ret = router.subscribe(exchange);
  if (ret.error == undefined) {
    response.status(200).send(ret);
  } else {
    response.status(500).send(ret);
  }
});

app.post('/push', function (request, response) {
  var channel = request.body.channel;
  var message = request.body.message;
  var ret = router.push(channel, message);
  if (ret.error == undefined) {
    response.status(200).send(ret);
  } else {
    response.status(500).send(ret);
  }
});

app.post('/fetch', function (request, response) {
  var channel = request.body.channel;
  var ret = router.fetch(channel);
  if (ret.error == undefined) {
    response.status(200).send(ret);
  } else {
    response.status(500).send(ret);
  }
});

app.listen(3000);
