var exchanges = new Object;

exports.publish = function (exchange) {
  if (exchanges[exchange] == undefined) {
    exchanges[exchange] = new Array;
  }

  return {channel: exchange};
};

exports.subscribe = function (exchange) {
  if (exchanges[exchange] == undefined) {
    return {error: "undefined"};
  } else {
    return {channel: exchange};
  }
};

exports.push = function (channel, message) {
  if (exchanges[channel] == undefined) {
    return {error: "undefined"};
  } else {
    exchanges[channel].push(message);
    return {channel: channel};
  }
};

exports.fetch = function (channel) {
  if (exchanges[channel] == undefined) {
    return {error: "undefined"};
  } else {
    var message = exchanges[channel].shift();
    if (message) {
      return {message: message};
    } else {
      return {error: "empty"};
    }
  }
};
