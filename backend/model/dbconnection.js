require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dbName = process.env.DB_NAME
const mongoURL=process.env.MONGODB_URL


    // Connect to MongoDB Atlas
mongoose.connect(mongoURL, { dbName })
.then(() => {
  console.log('Connected to MongoDB Atlas');
  app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
})
.catch(error => {
  console.error('Error connecting to MongoDB Atlas:', error);
});




module.exports = mongoose;