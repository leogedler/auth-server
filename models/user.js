const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
   email: { type: String, unique: true, lowercase: true },
   password: String
});

// Creat the model class
const ModelUserClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelUserClass;