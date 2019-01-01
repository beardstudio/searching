$(document).ready(function(){
  $.getJSON('../datas/companies.json', function(data) {
        
        $.each(data.agences.bruxelles, function(i, f) {
          var tblRow = 
            "<tr>" + "<td>" + f.agence + "</td>" +
             "<td>" + f.address + "</td>" + 
             "<td>" + f.cp + "</td>" + 
             "<td>" + f.tags + "</td>" + 
             "<td><a href='" + f.website + "' target='_blank'>Website</a></td>" + 
             "</tr>";
             $(tblRow).appendTo(".filtre table tbody");
        });
  });
  
  
  // var dataSearch = $('#search').val(valueSearch);
  // console.log(dataSearch);

  $(".searchButton").on('click', function(){
    var valueSearch = $("#search").val();
    $(".test").append(valueSearch);
    console.log(valueSearch);
  });


  $('.searchButton').on('keypress', function(e){
        if(e.which == 13){//Enter key pressed
            // $('#searchButton').click();//Trigger search button click event
            var valueSearch = $("#search").val();
            $(".test").append(valueSearch);
            console.log(valueSearch);
        }
  });

});