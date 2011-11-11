(function() {
  var SensorStream, cradle, stream;

  cradle = require('cradle');

  SensorStream = require('./sensor_stream');

  stream = new SensorStream();

  stream.work();

}).call(this);
