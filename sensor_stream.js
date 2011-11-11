(function() {
  var SensorStream, cradle, events, readability, request, _;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  request = require('request');

  readability = require('readability');

  events = require('events');

  cradle = require('cradle');

  _ = require('underscore');

  SensorStream = (function() {

    __extends(SensorStream, events.EventEmitter);

    function SensorStream() {
      this.db = new cradle.Connection('http://192.168.1.5', 5984, {
        cache: false,
        auth: {
          username: 'kalkov',
          password: 'parola221'
        }
      }).database('sensors');
    }

    SensorStream.prototype.watch = function() {
      var ids, self;
      self = this;
      ids = [];
      return this.db.changes({
        limit: 1
      }).on('response', function(res) {
        return res.on('data', function(change) {
          console.log('Change : ' + change);
          return self.db.get(change.id, function(err, doc) {
            self.emit('processed', {
              id: 'Emitted'
            });
            return console.log('Emiited');
          });
        });
      });
    };

    SensorStream.prototype.work = function() {
      var self;
      self = this;
      if (this.db) {
        return this.db.changes({
          limit: 1
        }).on('response', function(res) {
          return res.on('data', function(change) {
            return self.db.get(change.id, function(err, doc) {
              if ((doc != null) !== true) return;
              return request({
                uri: doc.url
              }, function(err, res, body) {
                return readability.parse(body, doc.url, function(result) {
                  return doc.content = result.content;
                });
              });
            });
          });
        });
      }
    };

    return SensorStream;

  })();

  module.exports = SensorStream;

}).call(this);
