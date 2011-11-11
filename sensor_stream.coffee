request = require 'request'
readability = require 'readability'
events = require 'events'
cradle = require 'cradle'
_ = require 'underscore'

class SensorStream extends events.EventEmitter
  constructor: ->
    @db = new(cradle.Connection)('http://192.168.1.5', 5984, { cache: false , auth: { username: 'kalkov', password: 'parola' } }).database 'sensors'
    #@db = couchDBMiddleware()	
  watch: ->
    self = this
    ids = []
    @db.changes({limit:1}).on 'response', (res) ->
      res.on 'data', (change) ->
        console.log('Change : '+change)
        self.db.get change.id, (err, doc) ->
          self.emit 'processed', { id: 'Emitted'}    
          console.log('Emiited')              			
      #.on 'end', ->
      #  self.emit 'processed'
      #    text: 'end'
     # .on 'error',(err) ->
     #   self.emit 'processed',
     #     text: 'err'
    #.on 'error',(err) ->
    #  self.emit 'processed',
    #    text: 'err'
   # .on 'end', ->
   #   self.emit 'processed'
   #     text: 'end'

  work: ->
    self = this
    if @db then @db.changes({limit:1}).on 'response', (res) ->
      res.on 'data', (change) ->
        self.db.get change.id, (err, doc) ->
          if (doc? isnt true)
            return
          request { uri: doc.url }, (err, res, body) ->
            readability.parse body, doc.url, (result) ->
              doc.content = result.content
              #console.log result
              #self.db.save doc									#self.emit 'processed', { id: doc.id, title: result.title }

												
module.exports = SensorStream

