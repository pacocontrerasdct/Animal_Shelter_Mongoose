var express = require('express');
var path = require('path');
var debug = require('debug');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
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
// Overwrites POST forms to DELETE values or any other kind we pass in as method
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));



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
  // newAnimal is { name: '13', breed: '13', _id: 560833aa8ac6238b099a3dc3 }
  // send a response with newly created object shelter.js
  res.json(newAnimal)
})

app.delete('/animals/:id', function (req, res) {
  console.log("hello app delete");
  console.log(req.params['id']);
  var idAnimal = req.params['id'];
  Animal.findOneAndRemove({'_id' : idAnimal }, function (err,animal){
    res.json(animal);
  });
  console.log("Deleting");

 // if (Animal.remove(deleteAnimal)){
 //   console.log('removed!');
 //   // render deleted object
 //     res.json(deleteAnimal);
 // } else { console.log('failed!'); }


//  Animal.find({ _id : obj } , function(err, item) {
//          if (!err){ 
//              console.log(obj);
//              console.log("inside find");
//              Animal.remove(item);
//              console.log('removed!');
//              res.json(obj);
//          } else { console.log('failed!1');}
//  });
})


app.put('/animals/:id', function (req, res) {
  //var idAnimal = req.body.data;
  console.log("hello app put");
  console.log(req.params['id']);
  idAnimal = req.params['id'];
  Animal.findOne({'_id' : idAnimal }, function (err, doc){
  doc.status = 'Abandon';
  //doc.visits.$inc();
  doc.save();
  res.json(doc);
});

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





