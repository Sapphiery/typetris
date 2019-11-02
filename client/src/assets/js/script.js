import $ from "jquery";

$(document).on("click", "#leaderboards", function() {
    $(".leaderContainer").fadeToggle(450);
})

$(document).on("click", ".start", function() {
    $(".start").css("display", "none");
})

