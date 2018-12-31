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
});