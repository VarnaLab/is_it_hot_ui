var express = require('express');

exports.printObj = function printObj(obj) {
  var result = [];

  for (var key in obj) {
    result.push(obj[key]);
  }
  return result;
  // result is now an array of the input object's values.
}


  
