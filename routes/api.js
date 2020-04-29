'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var Mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const CONNECTION_STRING = process.env.DB;

MongoClient.connect(CONNECTION_STRING, function(err, db){
  if(err == null) {
    console.log("Connected successfully to the server");
  } else {
    console.log(err);
  }
});


var Schema = Mongoose.Schema;

var issueSchema = new Schema({
  issue_title: {type: String, required: true},
  created_by : {type: String, required : true},
  issue_text : {type: String, required: true},
  assigned_to : {type: String},
  status : {type: Boolean}
});

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
    })
    
    .post(function (req, res){
      var project = req.params.project;
      var info = req.query.issue_text;
      var createdBy = req.query.created_by;
      var title = req.query.issue_title;



      if(info == "" || info == null) {
        res.send("issue_text missing");
      } else if(createdBy == "" || createdBy == null){
        res.send("created_by missing");
      } else if(title == "" || title == null){
        res.send("issue_title missing");
      } else {
      }
    
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
