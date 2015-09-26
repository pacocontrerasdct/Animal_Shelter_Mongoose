var mongoose = require('mongoose')

var animalSchema = new mongoose.Schema({
  name: String,
  breed: String,
  dob: Date,
  gender: String,
  family: String,
  status: String,
  createAt: Date,
  updateAt: Date
})

// we can use instance methods
animalSchema.methods.sayHello = function() {
  return 'You have a new animal in your shelter. Its name is ' + this.name;
}

var Animal = mongoose.model('Animal', animalSchema)
module.exports = Animal