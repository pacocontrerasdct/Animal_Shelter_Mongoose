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
        template += '<span class="label label-default">' + animal.breed + '</span>';
        template += '<button data-id="' + animal.id + '" type="button" class="js-close close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        template += '</li>';
        $('#animal-ul').append(template);
      })
    })
  },
  create: function(animalParams) {
    console.log(animalParams);
    $.post('/animals', animalParams)
    .done(function(response) {
      var animal = response
      var template = '<li class="list-group-item">';
      template += animal.name;
      template += '<span class="label label-default">' + animal.breed + '</span>';
      template += '<button data-id="' + animal.id + '" type="button" class="js-close close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
      template += '</li>';
      $('#animal-ul').append(template);
    })
    .done(function() {
      $('#animal-form').trigger('reset');
    })
  }




}










