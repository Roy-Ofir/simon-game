let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;
let clicks = 0;

function gameOver(){
    $("#level-title").html("GAME OVER");
    setTimeout(() => {
        $("h1").animate({height: 'toggle'});
    }, 1500);
    setTimeout(() => {
         $("#level-title").html("Press any key to restart the game");
         $("h1").animate({ height: "toggle" });
        gamePattern = [];
        userClickedPattern = [];
        gameStarted = false;
        level = 0;
        clicks = 0;
    }, 2500);
}

function checkAnswer(level, isLastOnPattern){
    let userAnswer = true;
    let i = 0;
    while((i < level) && userAnswer){
        userAnswer = userClickedPattern[i] === gamePattern[i];
        i++;
    }
    
    if(userAnswer && isLastOnPattern){
        setTimeout(() => {
            newSequence();
        }, 1000);
    }
    else{
        if(!userAnswer){
            console.log("game Pattern: " + gamePattern + " </br> " + "user Pattern: " + userClickedPattern);
            gameOver();
        }
    } 
}

function addAnimationAndSound(button){
    //sounds
    let audio = new Audio("./sounds/" + button.attr("id") + ".mp3");
    audio.play();
    // animation
    button.addClass("pressed");
    setTimeout(() => {
      button.removeClass("pressed");
    }, 100);
}
function newSequence(){
    level++;
    $("h1").html("Level " + level);
    let rand = Math.floor(Math.random() * 4 );
    let randomChosenColor = buttonColors[rand];
    gamePattern[gamePattern.length] = randomChosenColor;
    let button = $("#" + randomChosenColor);
    addAnimationAndSound(button);
    userClickedPattern = [];
}

$(".btn").on("click", function (event){
    clicks++;
    if(clicks == level){
        let userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        addAnimationAndSound($("#" + userChosenColor));
        clicks = 0;
        checkAnswer(level, true);
    }
    else{
        if(clickes == 0){
            $("h1").html("bro wait a second");
        }
        else{
            let userChosenColor = event.target.id;
            userClickedPattern.push(userChosenColor);
            addAnimationAndSound($("#" + userChosenColor));
            checkAnswer(clicks, false);        
        }
    }
})

$(document).on("keydown", function (){
    if(!gameStarted){
        gameStarted = !gameStarted;
        newSequence();
    }
});