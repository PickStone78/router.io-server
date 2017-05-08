"use strict";

const assert = require('assert');
const router = require('../../router.io.server');

var exchange = 'test1';
var pubChannel = router.publish(exchange);

exchange = 'test2';
assert.throws(
  () => {
    router.subscribe(exchange);
  });

exchange = 'test1';
var subChannel = router.subscribe(exchange);

var channel = 'test3';
var message = 'hello';
assert.throws(
  () => {
    router.push(channel, message);
  });

router.push(pubChannel, message);

channel = 'test4';
assert.throws(
  () => {
    router.fetch(channel);
  });

var ret = router.fetch(subChannel);
assert.equal(message, ret);

assert.throws(
  () => {
    router.fetch(subChannel);
  });
