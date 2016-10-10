$(function(){

//Listen for submit and send the object to the solution router
  $('form').on('submit', function(event){
    event.preventDefault();
    var calculateData = {};
    var fields = $(this).serializeArray();

    fields.forEach(function (element, index){
      calculateData[element.name] = element.value;
    });

    $.ajax({
      type: 'POST',
      url: '/solution/' + calculateData.operator,
      data: calculateData,
      success: getSolution
    });
    // Need some code - likely jquery - that will clear the calulator and start over
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
