var express = require('express');
var path = require('path');
var debug = require('debug');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var router = express.Router();

mongoose.connect('mongodb://localhost/animal_shelter');

var Animal = require('./routes/animals')



app.engine('ejs', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
// body parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(expressLayouts);


app.use( express.static( path.join( __dirname, 'public' )));


app.get('/', function(req, res){
  res.render('index');
})

// Animals index path
app.get('/animals', function (req, res) {
  
  Animal.find({}, function(err, animals) {
      if (!err){ 
          console.log(animals);
          res.json(animals);
      } else {throw err;}
  });
})

app.post('/animals', function (req, res) {
  console.log(req.body);
  var newAnimal = Animal(req.body);
  newAnimal.save(function (err, animal) {
    if (err) console.log(err);
  })
  // send a response with newly created object
  res.json(newAnimal)
})





// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.listen(3000)




//  var toby = Animal({
//    "name": "Toby",
//    "breed": "Greyhound",
//    "dob": "2010-02-23",
//    "gender": "male",
//    "family": "dogs",
//    "status": "orphan",
//    "createAt": Date()
//  })


//  toby.save(function (err, animal) {
//    if (err) console.log(err);
//    console.log('toby has been created!');
//    // Using the sayHello method with the Animal object 'toby'
//    console.log(animal.sayHello());
//  })










