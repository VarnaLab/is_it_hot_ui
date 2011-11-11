/*
 * GET home page.
 */

module.exports = function(app){
    app.get('/sensors', require("../controllers/sensors").index);
    app.get('/sensors/room1', require("../controllers/sensors").room1);
    app.post('/sensors', require("../controllers/sensors").create);
    app.get('/save_design_docs', require("../controllers/save_design_docs"));
    app.get("/",function(req, res){
      res.render('index', { title: 'Express' })
    });
    return app;
}
