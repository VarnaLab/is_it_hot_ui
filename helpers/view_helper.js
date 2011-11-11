var express = require('express');

exports.get_order_of_sensors = function get_order_of_sensors(obj) {
  var result = [];

  for (var key in obj) {
    result.push(obj[key]);
  }
  return result;
  // result is now an array of the input object's values.
}


  
