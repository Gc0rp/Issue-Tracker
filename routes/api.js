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
  issue_text : {type: String, required: true},
  assigned_to : {type: String},
  status_text : {type: String}
});

var projectSchema = new Schema({
  project_name : {type: String, required: true},
  project_issues : {type: Array, "default" : []}
});

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
    })
    
    .post(function (req, res){

      console.log(req.params);
      var project = req.params.project;
      var info = req.params.issue_text;
      var createdBy = req.params.created_by;
      var title = req.params.issue_title;
      var assignedTo = req.params.assigned_to;
      var status = req.params.status_text;

      console.log("Project : " + project);
      console.log("Info : " + info);
      console.log("CreatedBy : " + createdBy);
      console.log("title : " + title);
      console.log("assignedTo : " + assignedTo);
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
            assigned_to : assignedTo,
            status_text : status
            });

            var projectModel = Mongoose.model('Project', projectSchema);

          db.collection('issues-data').findOneAndUpdate({project_name : project}, 
            {"$push" : {project_issues : {"$each" : [newIssue]}}}, function(err, project){

              if(err){
                res.send(err);
              } else if(project.value == null) {
                res.send("Project Not Found");
              } else {
                res.send("Issue Succesfully Added");
              }
          });
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
