'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

const dotenv = require('dotenv');
dotenv.config();

const CONNECTION_STRING = process.env.DB;

MongoClient.connect(CONNECTION_STRING, function(err, db){
  if(err == null) {
    console.log("Connected successfully to the server");
  } else {
    console.log(err);
  }
}); //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
    })
    
    .post(function (req, res){
      var project = req.params.project.trim();
      var info = req.query.issue_text;
      var createdBy = req.query.created_by;

      var required = [req.params.project.trim(), req.query.issue_text, req.query.created_by];

      if(required.indexof("") === -1 || required.indexOf(undefined) === -1) {

      }  
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
