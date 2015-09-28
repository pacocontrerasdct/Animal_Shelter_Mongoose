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
    $('#animalTemplate-ul').on('click', '.js-close', function(e) {
      e.preventDefault();
      Animal.delete($(this).data)
    })
    $('#update-status').on('click', '.js-close', function(e) {
      e.preventDefault();
      Animal.put($(this).data)
    })
  }
}

Animal = {
  all: function(response) {
    $.get('/animals', function(response){
      console.log(response);
      var animals = response;
      $.each(animals, function(index, animal) {
        // Extended Template
        var animalTemplate = '<li class="list-group-item">';
        animalTemplate += '<h4>' + animal.name + '</h4>';
        animalTemplate += ' <br><span class="">Breed: ' + animal.breed + '</span>';
        animalTemplate += ' <br><span class="">DOB: ' + animal.dob + '</span>';
        animalTemplate += ' <br><span class="">Gender:' + animal.gender + '</span>';
        animalTemplate += ' <br><span class="">Family: ' + animal.family + '</span>';
        animalTemplate += '<form method="POST" action="/animals/' + animal._id + '">';
        animalTemplate += '<input type="hidden" name="_method" value="put">';
        animalTemplate += ' <br>Status: <button>' + animal.status + '</button>';
        animalTemplate += '</form>';
        animalTemplate += '<form method="POST" action="/animals/' + animal._id + '">';
        animalTemplate += '<input type="hidden" name="_method" value="delete">';
        animalTemplate += '<br><button data-id="' + animal._id + '" type="submit" class="btn btn-default">Delete</button>';
        animalTemplate += '</form>';
        animalTemplate += '</li>';
        $('#animalTemplate-ul').append(animalTemplate);
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
      var animalTemplate = '<li class="list-group-item">';
        animalTemplate += '<h4>' + animal.name + '</h4>';
        animalTemplate += ' <br><span class="">Breed: ' + animal.breed + '</span>';
        animalTemplate += ' <br><span class="">DOB: ' + animal.dob + '</span>';
        animalTemplate += ' <br><span class="">Gender:' + animal.gender + '</span>';
        animalTemplate += ' <br><span class="">Family: ' + animal.family + '</span>';
        animalTemplate += '<form method="POST" action="/animals/' + animal._id + '">';
        animalTemplate += '<input type="hidden" name="_method" value="put">';
        animalTemplate += ' <br>Status: <button>' + animal.status + '</button>';
        animalTemplate += '</form>';      
        animalTemplate += '<form method="POST" action="/animals">';
        animalTemplate += '<input type="hidden" name="_method" value="delete">';
        animalTemplate += '<br><button data-id="' + animal._id + '" type="submit" class="btn btn-default">Delete</button>';
        animalTemplate += '</form>';
        animalTemplate += '</li>';
        $('#animalTemplate-ul').append(animalTemplate);
    })
    .done(function() {
      $('#animal-form').trigger('reset');
    })
  },
  delete: function(response) {
    console.log("in delete shelter");
    console.log(response);
    $.ajax({
      type: 'delete',
      url: '/animals',
      data: response
    })
    .done(function(response) {
      console.log(response);
      console.log("hello response");
      $('#animalTemplate-ul').empty()
      Animal.all()
    })
  },
  put: function(response) {
    console.log("in update shelter");
    console.log(response);
    $.ajax({
      type: 'put',
      url: '/animals',
      data: response
    })
    .done(function(response) {
      console.log(response);
      console.log("hello response");
      $('#animalTemplate-ul').empty()
      Animal.all()
    })
  }



}












