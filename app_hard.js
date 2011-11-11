
/**
 * Module dependencies.
 */

var express = require('express')
   ,config = require(__dirname + '/config.js').config
   ,couchDBMiddleware = require(__dirname + '/couchdb.js')
   ,date_helper = require(__dirname + '/helpers/date_helper.js')
   ,obj_helper = require(__dirname + '/helpers/obj_helper.js')
   ,view_helper = require(__dirname + '/helpers/view_helper.js')
  // ,sio = require('../../lib/socket.io')
   ,app = module.exports = express.createServer();

// Configuration
/*
app.configure('kalkov.dyndns.org', function(){
    app.use(function(req, res, next){
        
        };
        next();
    });
});
*/
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(couchDBMiddleware());
    app.use(app.router);

    app.use(express.static(__dirname + '/public'));
});

//Helpers
app.helpers({
  time_ago_in_words: date_helper.time_ago_in_words,
  printObj: obj_helper.printObj,
  get_order_of_sensors: view_helper.get_order_of_sensors
});


io = require('socket.io').listen(app);
  count = 0;
  io.sockets.on('connection', function(socket) {
    count++;
    io.sockets.emit('count', {
      number: count
    });
    setInterval(function() {
      return io.sockets.emit('count', {
        number: count
      });
    }, 1200);
    return socket.on('disconnect', function() {
      count--;
      return io.sockets.emit('count', {
        number: count
      });
    });
  });


// Routes
require('./routes')(app).listen(config.port);
console.log("is_it_hot_ui is listening on port %d in %s mode", config.port, app.settings.env);

/*
var io = sio.listen(app)
  , nicknames = {};

io.sockets.on('connection', function (socket) {
  socket.on('user message', function (msg) {
    socket.broadcast.emit('user message', socket.nickname, msg);
  });

  socket.on('nickname', function (nick, fn) {
    if (nicknames[nick]) {
      fn(true);
    } else {
      fn(false);
      nicknames[nick] = socket.nickname = nick;
      socket.broadcast.emit('announcement', nick + ' connected');
      io.sockets.emit('nicknames', nicknames);
    }
  });

  socket.on('disconnect', function () {
    if (!socket.nickname) return;

    delete nicknames[socket.nickname];
    socket.broadcast.emit('announcement', socket.nickname + ' disconnected');
    socket.broadcast.emit('nicknames', nicknames);
  });
});
*/
