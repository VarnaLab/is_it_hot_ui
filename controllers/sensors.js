var assert = require('assert');
var express = require('express');
var date = require('date-utils');

var renderOutput = function(doc){return "Total : " + doc;}    

var renderDocsRaw = function(res, docs){
  var output = [];
  docs.forEach(function (row) {
    output.push(row._id);
    output.push("Address: " + row.address + "Temp: "+row.data);
  });
  res.send(output.join("\r\n"));
}

exports.index = function (req, res) {
  req.db.view('sensors/sensors_all',{descending: true}, function (err, docs) {	
      res.render('sensors', { sensors: docs, title: "All sensors" });
  });
};


exports.room1 = function (req, res) {
  var d=new Date();
  if(d.getDate() < 10){ var today_date = "0" + d.getDate()}
  else {var today_data = d.getDate()}

  var minutes_str = d.getFullYear()+"_"+(d.getMonth()+1)+"_"+today_date+"@"+d.getHours();

  req.db.view('sensors/sensor_room1',{descending: true}, function (err, docs) {	
      res.render('sensor', { sensors: docs, title: "Sensor" });
  });
};

exports.create = function (req, res, next) {
  
}

exports.update = function (req, res, next) {
  
}

