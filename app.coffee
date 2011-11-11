express = require 'express'
cradle = require 'cradle'
config = require(__dirname + '/config.js').config
couchDBMiddleware = require(__dirname + '/couchdb.js')
date_helper = require(__dirname + '/helpers/date_helper.js')
obj_helper = require(__dirname + '/helpers/obj_helper.js')
view_helper = require(__dirname + '/helpers/view_helper.js')


app = module.exports = express.createServer()
io = require('socket.io').listen app
_ = require 'underscore'
SensorStream = require './sensor_stream'

#db = new(cradle.Connection)('http://192.168.1.5', 5984, { 'cache': false , auth: { username: 'kalkov', password: 'parola' } }).database 'sensors'
stream = new SensorStream()
stream.watch()

io.sockets.on 'connection', (socket) ->
  console.log('Connected ...')

  socket.on 'processed', (data) ->
    #console.log(data.id)
    console.log('Will Fire newDoc')
    socket.emit 'newDoc', data
    

  socket.on 'ok?', (data) ->
    console.log('Client JS received data')

  #db.all (err, docs) ->
  #  ids = _.map docs, (doc) ->
  #    doc.id
  #    db.get ids, (err, docs) ->
  #      _.each docs, (doc) ->
  #        socket.emit 'newDoc', { id: doc.doc._id, title: doc.doc.title }


app.configure ->	
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'jade'
  app.use express.bodyParser()
  app.use couchDBMiddleware()
  app.use express.methodOverride()
  app.use app.router
  app.use express.static __dirname + '/public'
  app.use express.errorHandler { dumpExceptions: true, showStack: true }

app.helpers({
  time_ago_in_words: date_helper.time_ago_in_words,
  printObj: obj_helper.printObj,
  get_order_of_sensors: view_helper.get_order_of_sensors
});



app.get '/', (req, res) ->
	res.render 'index', { title: 'Archive' }

app.get '/archive/:id', (req, res) ->
	db.get req.params.id, (err, doc) ->
		#res.render 'archive', { title: doc.title, content: doc.content }

require('./routes')(app).listen(config.port);
console.log("is_it_hot_ui is listening on port %d in %s mode", config.port, app.settings.env);


