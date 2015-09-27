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
      e.preventDefault();
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
        template += '<form method="POST" action="/animals" enctype="application/x-www-form-urlencoded">';
        template += '<input type="hidden" name="_method" value="DELETE">';
        template += '<button data-id="' + animal._id + '" type="submit" class="js-close close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        template += '</form>';       
        template += '</li>';
        $('#animal-ul').append(template);
      })
    })
  },
  create: function(response) {
    console.log(response);
    console.log("hello create");
    $.post('/animals', response)
    .done(function(response) {
      console.log(response);
      var animal = response;
      var template = '<li class="list-group-item">';
      template += animal.name;
      template += ' <span class="label label-default">' + animal.breed + '</span>';
      template += '<button data-id="' + animal._id + '" type="button" class="js-close close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
      template += '</li>';
      $('#animal-ul').prepend(template);
    })
    .done(function() {
      $('#animal-form').trigger('reset');
    })
  },
  delete: function(response) {
    console.log("in delete shelter");
    console.log(response);
    $.ajax({
      type: 'DELETE',
      url: '/animals',
      data: response
    })
    .done(function(response) {
      console.log(response);
      console.log("hello response");
      $('#animal-ul').empty()
      Animal.all()
    })
  }



}










