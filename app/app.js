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
  console.log("hi post");
  console.log(req.body);
  var newAnimal = Animal(req.body);
  newAnimal.save(function (err, animal) {
    if (err) console.log(err);
  })
  // send a response with newly created object
  res.json(newAnimal)
})

app.delete('/animals/:id', function (req, res) {
  console.log("hello app delete");
  console.log(req.params.id);
  var animalId = req.params.id;
  console.log(animalId);
    Animal.find({ _id : { $in: [animalId] } } , function(err, animalId) {
        if (!err){ 
            console.log(animalId);
            console.log("inside find");
            if ( Animal.remove({ _id : { $in: [animalId] } })  ){
             console.log('removed!');
             // render deleted object
                res.json(animalId)
           } else { console.log('failed!2'); }
        } else { console.log('failed!1');}
    });


  //var animalId = req.animalParams
  //Animal.remove(
  //  { _id: animalId }
  //)


  console.log("hitting delete route");
//  var animalId = req.params._id
//  // finding an object with id = req.body.id out of the animals
//  var animal = animals.filter(function(obj) {
//    return obj.id === Number(animalId);
//  })
//  // remove animal from array
//  console.log(animal);
//  var index = animals.indexOf(animal[0])
//  animals.splice(index, 1)
//  // render deleted object
//  res.json(animal)


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










