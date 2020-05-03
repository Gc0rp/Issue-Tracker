'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var Mongoose = require('mongoose');
var assert = require('assert');
const dotenv = require('dotenv');
dotenv.config();


const CONNECTION_STRING = process.env.DB;

var Schema = Mongoose.Schema;

var issueSchema = new Schema({
  issue_title: {type: String, required: true},
  created_by : {type: String, required: true},
  issue_text : {type: String, required: true}
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
        MongoClient.connect(CONNECTION_STRING, function(err, client){
          assert.equal(null, err);
          var db = client.db('Issues');

          var issueModel = Mongoose.model('Issue', issueSchema);
          
         var newIssue = new issueModel({
           issue_title: title,
           created_by: createdBy,
           issue_text : info,
         });

          db.collection('issues-data').insertOne(, function(err, result){
            assert.equal(null, err);
            console.log("Item inserted");
          });
        });
      }
      
       
         

         newIssue.save((err, data) => {
            console.log("In save");
            if(err) return done(err);
            return done(null, data);
         });

        
      }
    
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
