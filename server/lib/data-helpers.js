"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");



// Open Mongo Connection
let mongodb;
MongoClient.connect(MONGODB_URI, (err, db) => {
  if(err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  mongodb = db;
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
});

// Defines helper functions for saving and getting tweets, using the database `db`
  module.exports = function makeDataHelpers(db) {
    return {
      // Saves a tweet to `db`
      saveTweet: function(newTweet, callback) {
        simulateDelay(() => {
          //db.tweets.push(newTweet);
          mongodb.collection("tweets").insertOne(newTweet);
          callback(null, true);
        });
      },

      // Get all tweets in `db`, sorted by newest first
      getTweets: function(callback) {
        simulateDelay(() => {
          mongodb.collection("tweets").find().sort({'created_at': -1 }).toArray( (err, array) => {
            callback(null, array); 
          });
          //const sortNewestFirst = (a, b) => a.created_at - b.created_at;
          //callback(null, db.tweets.sort(sortNewestFirst));
        });
      }
    };
  }
