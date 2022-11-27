const crosshair = $("#crosshair");
const gun = $("#gun");
var idNo = 1;

//move gun & crosshair with mousemove
$(window).mousemove(function (event) {
    let yAxis = event.pageY;
    let xAxis = event.pageX;

    if (yAxis > 36 && yAxis < 514) {
        crosshair.css("top", yAxis);
    }
    if (xAxis > 230) {
        crosshair.css("left", xAxis);
    }

    if (1250 > xAxis && xAxis > 232) {
        gun.css("left", xAxis);
    }
});

$("#btnStart").click(function () {
    console.log("Started");
    setInterval(generateZombies, 1000);
});

//generate zombies
function generateZombies() {
    const zombie = $('<img>'); //create element
    zombie.addClass('zombie'); //add cls for styles
    zombie.attr("id", `zombie${idNo}`); //add id
    idNo++;
    let randomNo = Math.floor(Math.random() * 2) + 1; //generate random number
    zombie.attr("src", "assets/images/gif/zomR" + randomNo + ".gif"); //set gifs
    $("#areaL1").append(zombie); //add element to body

    setInterval(()=>{
        moveZombies(zombie);
    },100);
}
//move zombie
function moveZombies(zombie){
    let zomLeft = parseInt(zombie.css('left'));
    zombie.css('left', zomLeft - 10);
}