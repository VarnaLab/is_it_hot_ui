(function() {
  var SensorStream, app, config, couchDBMiddleware, cradle, date_helper, express, io, obj_helper, stream, view_helper, _;

  express = require('express');

  cradle = require('cradle');

  config = require(__dirname + '/config.js').config;

  couchDBMiddleware = require(__dirname + '/couchdb.js');

  date_helper = require(__dirname + '/helpers/date_helper.js');

  obj_helper = require(__dirname + '/helpers/obj_helper.js');

  view_helper = require(__dirname + '/helpers/view_helper.js');

  app = module.exports = express.createServer();

  io = require('socket.io').listen(app);

  _ = require('underscore');

  SensorStream = require('./sensor_stream');

  stream = new SensorStream();

  stream.watch();

  io.sockets.on('connection', function(socket) {
    console.log('Connected ...');
    socket.on('processed', function(data) {
      console.log('Will Fire newDoc');
      return socket.emit('newDoc', data);
    });
    return socket.on('ok?', function(data) {
      return console.log('Client JS received data');
    });
  });

  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(couchDBMiddleware());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });

  app.helpers({
    time_ago_in_words: date_helper.time_ago_in_words,
    printObj: obj_helper.printObj,
    get_order_of_sensors: view_helper.get_order_of_sensors
  });

  app.get('/', function(req, res) {
    return res.render('index', {
      title: 'Archive'
    });
  });

  app.get('/archive/:id', function(req, res) {
    return db.get(req.params.id, function(err, doc) {});
  });

  require('./routes')(app).listen(config.port);

  console.log("is_it_hot_ui is listening on port %d in %s mode", config.port, app.settings.env);

}).call(this);
