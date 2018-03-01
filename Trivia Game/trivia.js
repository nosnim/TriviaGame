$(document).ready(function() {
    $("button").click(function() {
        $("#startGame").hide();
        $(".container").show();
    })
})

var timeLeft = 31;
var gameTimer = setInterval(function() {
    timeLeft--;
    document.getElementById("timer").innerHTML = "Seconds Remaining: " + timeLeft;
    if(timeLeft <= 0)
        clearInterval(gameTimer);
},1000);