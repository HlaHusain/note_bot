const mongoose = require("./dbconnection.js");
// Initialize parameters
const collectionName_rating = process.env.DB_COLLECTION_RATINGS;

//define structure of the documents in a collection
const ratingSchema = new mongoose.Schema({

  object_id: {
    type: String,
    required: true,
  },
  object_type: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
});

const ratingModel = mongoose.model(collectionName_rating, ratingSchema);

module.exports = ratingModel;
