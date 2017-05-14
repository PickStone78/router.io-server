"use strict";

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
};

class Exchange {
  constructor(name) {
    this.name = name;
    this.readers = new Map;
    this.writer = null;
  }

  push(message) {
    this.writer.messages.push(message);
    for (var reader of this.readers.values()) {
      reader.messages.push(message);
    }
  }
}

class Channel {
  constructor(exchange) {
    this.exchange = exchange;
    this.messages = new Array;
  }

  fetch() {
    return this.messages.shift();
  }
}

var exchanges = new Map;
var channels = new Map;

exports.publish = function (name) {
  if (exchanges.has(name)) {
    var exchange = exchanges.get(name);
    if (exchange.writer) {
      throw new Error(name + " has been published");
    } else {
      var channel = new Channel(exchange);
      var channelID = generateUUID();
      exchange.writer = channel;
      channels.set(channelID, channel);
      return channelID;
    }
  } else {
    var exchange = new Exchange(name);
    exchanges.set(name, exchange);
    var channel = new Channel(exchange);
    var channelID = generateUUID();
    exchange.writer = channel;
    channels.set(channelID, channel);
    return channelID;
  }
};

exports.subscribe = function (name) {
  if (exchanges.has(name)) {
    var exchange = exchanges.get(name);
    var channel = new Channel(exchange);
    var channelID = generateUUID();
    exchange.readers.set(channelID, channel);
    channels.set(channelID, channel);
    return channelID;
  } else {
    throw new Error(name + " has not been published");
  }
};

exports.push = function (channelID, message) {
  if (channels.has(channelID)) {
    var channel = channels.get(channelID);
    if (channel.exchange.writer) {
      channel.exchange.push(message);
    } else {
      throw new Error(channelID + " has not been published");
    }
  } else {
    throw new Error(channelID + " has not been published");
  }
};

exports.fetch = function (channelID) {
  if (channels.has(channelID)) {
    var channel = channels.get(channelID);
    if (channel.exchange.readers.has(channelID)) {
      var message = channel.fetch();
      if (message) {
        return message;
      } else {
        throw new Error(channel.exchange.name + " has not any message");
      }
    } else {
      throw new Error(channelID + " has not been subscribed");
    }
  } else {
    throw new Error(channelID + " has not been subscribed");
  }
};

exports.close = function (channelID) {
  if (channels.has(channelID)) {
    var channel = channels.get(channelID);
    if (channel.exchange.writer) {
      channels.delete(channelID);
      channel.exchange.writer = null;
      exchanges.delete(channel.exchange.name);
    } else {
      throw new Error(channelID + " is not exist");
    }
  } else {
    throw new Error(channelID + " is not exist");
  }
};

