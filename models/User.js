const mongoose = require('mongoose');

// Example of Object Destructuring. Same as const Schema = mongoose.Schema;
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
  googleId: String,
  googleName: String
});

// Create User Model
mongoose.model('User', userSchema);
