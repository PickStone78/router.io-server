"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./lib/router.js');

app.use(bodyParser.json()); 
app.use(express.static('./public'));

app.post('/publish', function (request, response) {
  var exchange = request.body.exchange;
  try {
    var ret = router.publish(exchange);
    console.log('Publish: ' + exchange);
    response.status(200).send({channel: ret});
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/subscribe', function (request, response) {
  var exchange = request.body.exchange;
  try {
    var ret = router.subscribe(exchange);
    console.log('Subscribe: ' + exchange);
    response.status(200).send({channel: ret});
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/push', function (request, response) {
  var channel = request.body.channel;
  var message = request.body.message;
  try {
    var ret = router.push(channel, message);
    console.log('Push: %s %s', channel, message);
    response.status(200).send({channel: ret});
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/fetch', function (request, response) {
  var channel = request.body.channel;
  try {
    var ret = router.fetch(channel);
    console.log('Fetch: %s', channel);
    response.status(200).send({message: ret});
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(3000);
