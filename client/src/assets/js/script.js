import $ from "jquery";

$(document).on("click", "#leaderboards", function() {
    $(".leaderContainer").fadeToggle(450);
})

$(document).ready(function() {

var rn = 20;
var cn = 15;
  
 for(var r=0;r<parseInt(rn,10);r++) {
   var row = $("<tr>")
   for(var c=0;c<parseInt(cn,10);c++) {
        var cell = $("<td>")
        row.append(cell)
    }
    $(".game-table").append(row);
   }
})