"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> Let's "get all the tweets". In Mongo-speak, we "find" them.
  db.collection("tweets").find({}, (err, result) => {
    // Lazy error handling:
    if (err) throw err;

    result.toArray( (err, resultsArray) => {
      if(err) throw err;

      console.log("results.toArray:", resultsArray);
    });

    // ==> This is inside this callback now. Think about it:
    // This is now the "end of the program", right?.
    db.close();
  });

});
