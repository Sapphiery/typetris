import $ from "jquery";

$(document).on("click", "#leaderboards", function() {
    $(".leaderContainer").fadeToggle(450);
})

$(document).on("click", ".start", function() {
    $(".start").css("display", "none");
})

$(document).on("keyup", "body", function(e) {
    var t = e.key;
    console.log("K :", t)
    var text = document.getElementById("currentWord").innerText,
        pos = text.search(t);
        console.log("RESULTS: ")
    console.log(text)
    console.log(pos)
    if(pos > -1){
        $('.currentWord').html(text.substring(0,pos)+'<span class="highlight">'+t+'</span>'+text.substring(pos+t.length));      
        pos ++;
        console.log("POS NOW: ", pos)
    }else{
        $('.currentWord').text(text);
    }
console.log("KEY: ", t);

});


