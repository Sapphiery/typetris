import $ from "jquery";

$(document).on("click", "#leaderboards", function() {
    $(".leaderContainer").fadeToggle(450);
})

$(document).on("click", ".start", function() {
    $(".start").css("display", "none");
})

var $target = $('.currentWord')

$(document).on("keyup", "body", function(e) {
    var t = e.key;
    console.log("K :", t)
    t += String.fromCharCode(e.which);
    t.toLowerCase();
    var text = $target.text(),
        pos = text.search(t);
    if(pos > -1){
        $target.html(text.substring(0,pos)+'<span class="highlight">'+t+'</span>'+text.substring(pos+t.length));      
    }else{
        $target.text(text);
    }
console.log("KEY: ", t);
});

