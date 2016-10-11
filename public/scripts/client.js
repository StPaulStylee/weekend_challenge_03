$(function(){

// Listen for submit and send the object to the solution router
  $('.value').on('click', numberClick);
  $('.operator').on('click', operationClick);
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
var operationClicked = false;

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
// Calls the buttons data value and inserts it into the approptiate input box.
function numberClick() {
  var buttonValue = $(this).data('value');
  if (operationClicked == false){
    $('#valueA').val($('#valueA').val() + buttonValue);
  }
  else {
    $('#valueB').val($('#valueB').val() + buttonValue);
  }
}
// When function is called it swtiches operationClicked value to true, which allows me to switch input boxes.
function operationClick() {
  operationClicked = true;
}
