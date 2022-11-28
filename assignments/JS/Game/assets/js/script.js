$('#containerMenu').css('display','block');
$('#containerL1').css('display','none');

//=====LEVEL 1===========================
const crosshair = $("#crosshair");
const gun = $("#gun");
const score = $('#score');
const bullets = $('#bullets');
var idNo = 1;

var zombieTimer1 = 0
var zombieTimer2 = 0
var zombieTimer3 = 0

var scoreCount = 0;
var bulletCount = 21;

// move gun & crosshair with mousemove
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

//start game
var tempRandom = 0;
$("#btnStart").click(function () {
    console.log('Clicked');
    score.text('00');   //to confirm the program start
    bullets.text(bulletCount);  //display bullet count on start
    let randomTimer = 1000;
    let generateTimer = 2750;

    zombieTimer1 = setInterval(() => {
        let random = (Math.floor(Math.random() * 5) + 1) * 1000;
        if (tempRandom != random) {
            randomTimer = random;
            console.log("random - " + randomTimer);
        } else if (tempRandom == random) {
            generateTimer = random;
            console.log("generate - " + generateTimer);
        }
        tempRandom = random;

        zombieTimer2 = setTimeout(generateZombies, randomTimer);
    }, generateTimer);
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

    zombieTimer3 = setInterval(() => {
        moveZombies(zombie);
    }, 100);
}

//move zombie
function moveZombies(zombie) {
    let zomLeft = parseInt(zombie.css('left'));
    zombie.css('left', zomLeft - 10);
}

$(window).click(function (event) {
    //shoot zombies
    if (event.target.className === 'zombie') {
        let zomId = $("#" + event.target.id); // identify targeted zombie by id
        zomId.css("display", "none");

        scoreCount++;   //count score
        score.text('0' + scoreCount); //display score
    }

    bulletCount--;  //count bullets
    bullets.text(bulletCount);    //display bullets

    checkGameStatus();

});
//check win or lose
function checkGameStatus(){
    //check lose by bullet count
    if(bulletCount === 0 && scoreCount !== 15){
        clearTimers();
        alert('GAME OVER ---> YOU LOSE');
    }
    //check win by score
    if(scoreCount === 15 && bulletCount >= 0){
        clearTimers();
        alert('GAME OVER ---> YOU WIN');
    }
}

//clear intervals
function clearTimers(){
    clearInterval(zombieTimer1);
    clearInterval(zombieTimer2);
    clearInterval(zombieTimer3);
}

//=====Main Page======================
$('#btnStartGame').click(function () {
    $('#containerMenu').css('display','none');
    $('#containerL1').css('display','block');
});
