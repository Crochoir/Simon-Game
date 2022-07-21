//necessary variables of arrays
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;



$(document).keydown(function() {
  nextSequence();
  //console.log(gamePattern.length - 1);
});


//game color decision
function nextSequence() {

  userClickedPattern = [];

  $("h1").text("level " + (level + 1));
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push("#" + randomChosenColor);



  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);


  playSound(randomChosenColor);

  level++;
}

//detecting and adding clicked color into array
$(".btn").click(function() {
  //deciding which color was pressed
  var userChosenColor = "#" + this.id;
  userClickedPattern.push(userChosenColor);
  //playing sound for whichever color was pressed

  playSound(this.id);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  //console.log(userClickedPattern.length - 1);

});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
  setTimeout(function() {
    $(currentColor).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {
  //console.log(userClickedPattern[currentLevel] + ", " + gamePattern[currentLevel]);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var overAudio = new Audio("sounds/wrong.mp3");
    overAudio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 1000);
    gamePattern = [];
    $("h1").text("Game Over, Press Any Key to Restart");
    level = 0;
  }
}
