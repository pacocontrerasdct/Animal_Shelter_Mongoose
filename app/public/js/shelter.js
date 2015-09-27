// Namespaces
var Animal = Animal || {};
var View = View || {};


$(document).ready(function() {
  Animal.all();
  View.initialise();
})

View = {
  initialise: function() {
    $('#animal-form').on('submit', function(e) {
      e.preventDefault();
      Animal.create($(this).serialize())
    })
    $('#animal-ul').on('click', '.js-close', function(e) {
      Animal.delete($(this).data('id'))
    })
  }
}

Animal = {
  all: function() {
    $.get('/animals', function(response){
      console.log(response);
      var animals = response;
      $.each(animals, function(index, animal) {
        var template = '<li class="list-group-item">';
        template += animal.name;
        template += ' <span class="label label-default">' + animal.breed + '</span>';
        template += '<button data-id="' + animal._id + '" type="button" class="js-close close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        template += '</li>';
        $('#animal-ul').append(template);
      })
    })
  },
  create: function(response) {
    console.log(response);
    $.post('/animals', response)
    .done(function(response) {
      var animal = response
      var template = '<li class="list-group-item">';
      template += animal.name;
      template += '<span class="label label-default">' + animal.breed + '</span>';
      template += '<button data-id="' + animal + '" type="button" class="js-close close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
      template += '</li>';
      $('#animal-ul').append(template);
    })
    .done(function() {
      $('#animal-form').trigger('reset');
    })
  },
  delete: function(response) {
    var animal = response;
    console.log(animal);
    
    $.ajax({
      type: 'DELETE',
      url: 'animals/' + animal,
      data: animal
    })
    .done(function(response) {
      console.log(response);
      $('#animal-ul').empty()
      Animal.all()
    })
    


    //$.ajax({
    //  type: 'DELETE',
    //  url: 'animals/', function (response){
    //    $.find({ _id : { $in: ["5606f2e8fb4471275283656e"] } } , function(err,// animalId) {
    //      if (!err){ 
    //          console.log(animalId);
    //          if ( Animal.remove({ _id : { $in: ["5606f2e8fb4471275283656e"] } })  ){
    //           console.log('removed!');
    //         } else { console.log('failed!'); }
    //      } else {throw err;}
    //    });
    //  }
    //})
    //.done(function(response) {
    //  console.log(response);
    //  $('#animal-ul').empty();
    //  Animal.all();
    //})

  }



}










