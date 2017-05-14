"use strict";

const assert = require('assert');
const router = require('../../router.io.server');

var exchange = 'test1';
var pubChannel = router.publish(exchange);
var subChannel = router.subscribe(exchange);
router.push(pubChannel, 'hello');
var ret = router.fetch(subChannel);
assert.equal('hello', ret);

assert.throws(
  () => {
    router.publish(exchange);
  });

router.close(pubChannel);
assert.throws(
  () => {
    router.push(pubChannel, 'world');
  });
assert.throws(
  () => {
    router.fetch(subChannel);
  });

pubChannel = router.publish(exchange);
var subChannel1 = router.subscribe(exchange);
var subChannel2 = router.subscribe(exchange);
router.push(pubChannel, 'hello');
router.push(pubChannel, 'world');
ret = router.fetch(subChannel1);
assert.equal('hello', ret);
ret = router.fetch(subChannel2);
assert.equal('hello', ret);
ret = router.fetch(subChannel2);
assert.equal('world', ret);
ret = router.fetch(subChannel1);
assert.equal('world', ret);
