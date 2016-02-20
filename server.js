
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config.js');

var Thing = require('./models/thing.js');
var Temperatur = require('./models/temperatur.js');
var Gyro = require('./models/gyro.js');

mongoose.connect('mongodb://localhost:20937/sensordata', config.mongodb);

var app = express();

app.use(bodyParser.json());

// Define API
app.get('/', function (req, res) {

  var endpoints = [
            {"url":"/things","method":"GET","description":"get all Things"},
            {"url":"/things","method":"POST","description":"create new Things"},
            {"url":"/things/{ObjectId}","method":"GET","description":"get one Thing"},
            {"url":"/things/{ObjectId}","method":"PUT","description":"update existing Thing"},
            {"url":"/things/{ObjectID}","method":"DELETE","description":"delete existing Thing"},
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
    else
    res.json(docs);
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

// get Sensor Data of a Thing
app.get('/things/:_id/:_sensor'), function(req, res){
  if(req.params._sensor == "temperatures"){
      Temperatur.find({'thing_id': req.params._id}, function (err, docs){
          if(err)
            res.send(err);

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
}

var server = app.listen(config.app.port, function (err) {
  if (err)
    console.log(err);

  var host = server.address().address;
  var port = server.address().port;

});
