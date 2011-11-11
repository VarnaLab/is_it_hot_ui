var assert = require('assert');
var cradle = require('cradle');

module.exports = function(req, res, next){
    
    req.db.save('_design/sensors', {
        views: {
          sensors_today: {
            map: function(doc) {
                   var d=new Date();
                   if(d.getDate() < 10){ var today_date = "0" + d.getDate()}
                   else {var today_data = getDate()}

                   str = d.getFullYear()+"_"+(d.getMonth()+1)+"_"+today_date;

                   if(doc._id.search(str) != -1) {
                     emit(str, doc);
                   }
                 }
          },
          
          sensors_last_minute: {
            map: function(doc) {
                   var d=new Date();
                   if(d.getDate() < 10){ var today_date = "0" + d.getDate()}
                   else {var today_data = getDate()}

                   str = d.getFullYear()+"_"+(d.getMonth()+1)+"_"+today_date+"@"+d.getHours()+":"+d.getMinutes();

                   if(doc._id.search(str) != -1) {
                     emit(doc.time, doc);
                   }
            }
          },
          
          sensors_last_hour: {
            map: function(doc) {
                   var d=new Date();
                   if(d.getDate() < 10){ var today_date = "0" + d.getDate()}
                   else {var today_data = getDate()}

                   str = d.getFullYear()+"_"+(d.getMonth()+1)+"_"+today_date+"@"+d.getHours();

                   if(doc._id.search(str) != -1) {
                     emit(str, doc);
                   }
                 }
          },
          
          sensor_room1: {
            map: function(doc) {
                   if(doc.sensors){
                     for(var i=0;i<doc.sensors.length;i++){
                       if(doc.sensors[i].name.search("room1") != -1){
                             emit([doc.time,doc.sensors[i].data], [doc.sensors[i].address,doc.sensors[i].data,doc.time]);
                       }
                     }
                   }
            }
          },
            
          sensors_all: {
            map: function(doc) {
                   emit(doc.time, doc);
                 }
            }
           
         
      }
    }
  , function(err){
    if(err)
      throw err;
    res.send("OK");
  });
  
}
