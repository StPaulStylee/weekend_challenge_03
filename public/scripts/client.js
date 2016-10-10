$(function(){

// Listen for submit and send the object to the solution router
  $('button').on('click', numberClick);

  $('form').on('submit', function(event){
    event.preventDefault();
    var calculateData = {};
    var fields = $(this).serializeArray();
    console.log('Data to be objectified: ', fields);

    fields.forEach(function (element, index){
      calculateData[element.name] = element.value;
    });
    console.log('Object created: ', calculateData);
    console.log('Router to send:', calculateData.operator);

    $.ajax({
      type: 'POST',
      url: '/solution/' + calculateData.operator,
      data: calculateData,
      success: getSolution
    });
    // Clear the calulator and start over
    $('#clear').on('click', function(){
      $('form').find('input[type=number]').val('');
      $('.calculation').find('span').remove();
    });
  });
}); //End of document ready

function getSolution () {
  $.ajax({
    type: 'GET',
    url: '/solution',
    success: function(solution){
      $('.calculation').find('span').remove();
      var $span = $('<span></span>');
      $span.append(solution);
      $('.solution').append($span);
    }
  });
}

function numberClick() {
  var buttonValue = $(this).data('value');
  console.log(buttonValue);
  $('#valueA').append(buttonValue);
}
