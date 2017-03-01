var exchanges = new Object;

exports.publish = function (exchange) {
  if (exchanges[exchange] == undefined) {
    exchanges[exchange] = new Array;
  }

  return exchange;
};

exports.subscribe = function (exchange) {
  if (exchanges[exchange] == undefined) {
    throw 'undefined';
  } else {
    return exchange;
  }
};

exports.push = function (channel, message) {
  if (exchanges[channel] == undefined) {
    throw 'undefined';
  } else {
    exchanges[channel].push(message);
    return channel;
  }
};

exports.fetch = function (channel) {
  if (exchanges[channel] == undefined) {
    throw 'undefined';
  } else {
    var message = exchanges[channel].shift();
    if (message) {
      return message;
    } else {
      throw 'empty';
    }
  }
};
