require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dbName = 'NoteBot'
const mongoURL='mongodb+srv://hlahusain:PSLm2SokH5MXvlTp@cluster0.jj2c6kn.mongodb.net/?retryWrites=true&w=majority'



    // Connect to MongoDB Atlas
mongoose.connect(mongoURL, { dbName })
.then(() => {
  console.log('Connected to MongoDB Atlas');
  //app.listen(3000, () => {
  //    console.log('Server started on port 3000');
  //  });
})
.catch(error => {
  console.error('Error connecting to MongoDB Atlas:', error);
});




module.exports = mongoose;