
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config.js');

var Thing = require('./models/thing.js');
var Sensor = require('./models/sensor.js');
var Temperature = require('./models/temperature.js');
var Gyro = require('./models/gyro.js');

mongoose.connect("mongodb://" + config.mongodb.host + ":" + config.mongodb.port + "/" + config.mongodb.database, config.mongodb);

var app = express();

app.use(bodyParser.json());

// Define API
app.get('/', function (req, res) {

  var endpoints = [
            {"url":"/things","method":"GET","description":"receive all Things"},

            {"url":"/things","method":"POST","description":"create Thing"},
            {"url":"/things/{ThingID}","method":"GET","description":"receive Thing"},
            {"url":"/things/{ThingID}","method":"PUT","description":"update Thing"},
            {"url":"/things/{ThingID}","method":"DELETE","description":"delete Thing"},

            {"url":"/things/{ThingID}/{SensorType}","method":"POST","description":"create Sensordata of a Thing"},
            {"url":"/things/{ThingID}/{SensorType}","method":"GET","description":"receive Sensordata of a Thing"},

            {"url":"/sensors/temperatures","method":"GET","description":"get all Temperature Values"},
            {"url":"/sensors/temperatures","method":"POST","description":"create new Temperature Value"},
            {"url":"/sensors/temperatures/{ObjectId}","method":"PUT","description":"update Temperature Value"},
            {"url":"/sensors/temperatures/{ObjectId}","method":"DELETE","description":"delete Temperature Value"},
            {"url":"/sensors/gyros","method":"GET","description":"get all Gyro Values"},
            {"url":"/sensors/gyros","method":"POST","description":"create new Gyro Value"},
            {"url":"/sensors/gyros/{ObjectId}","method":"PUT","description":"update Gypo Value"},
            {"url":"/sensors/gyros/{ObjectId}","method":"DELETE","description":"delete Gyro Value"}
            ];
    res.json(endpoints);
});

// get all Things
app.get('/things', function (req, res){
  Thing.find(function(err, docs) {
    if (err)
      res.send(err);
    else{
    res.status(200);
    res.json(docs);
    }
  });
});

// CRUD for things

// create thing
app.post('/things', function (req, res){
  var doc = new Thing(req.body);
  doc.save(function(err){
      if (err)
          res.send(err)
      else
        res.json(doc);
  })
})

// receive thing
app.get('/things/:_id', function (req, res){
  Thing.findById(req.params._id, function(err, doc) {
    if (err)
      res.send(err);
    else
      res.json(doc);
  });
});

// update thing
app.put('/things/:_id', function (req, res){
  Thing.findById(req.params._id, function(err, doc) {
    if (err)
      res.send(err);
    else{
      doc.desc = req.body.desc;
      doc.save(function(err){
        if(err)
          res.send(err);
        else
          res.json(doc);
      })
    }
  });
});

// delete thing
app.delete('/things/:_id', function (req, res){
  Thing.findByIdAndRemove(req.params._id, function(err, docs) {
    if (err)
      res.send(err);
    else
      res.json(docs);
  });
});

// CRUD for Temperatures



// get Sensor Data of a Thing

app.get('/things/:_id/temperature', function(req, res){
            res.json("docs");

});

app.post('/things/:_id/:_sensor', function(req, res){
  if(req.params._sensor == "temperatures"){
    var doc = new Temperature();

    doc.thing_id = req.params._id;
    doc.sensor_id = req.body.sensor_id;
    doc.value = req.body.value;

    doc.save(function(err){
      if (err)
          res.send(err)
      else
        res.json(doc);
    })
  }
})



app.get('/things/:_id/:_sensor', function(req, res){
  if(req.params._sensor == "temperatures"){
      Temperature.find({'thing_id': req.params._id}, function (err, docs){
          if(err)
            res.send(err);
          else
            res.json(docs);
      });
  }
  else if(req.params._sensor == "gyros"){
      Gyro.find({'thing_id': req.params._id}, function (err, docs){
          if(err)
            res.send(err);
          else
            res.json(docs);
      });

  }
});

var server = app.listen(config.app.port, function (err) {
  if (err)
    console.log(err);

  var host = server.address().address;
  var port = server.address().port;

});
