var started = false;
var character = document.getElementById("character");
var block = document.getElementById("block");
var score = 0;
var highscore = 0;
var die = true;
var last1k = 0;

function button(){
    if (started == true){
        jump();
    } else {
        start();
    }
}

document.addEventListener("keydown", evt => {
    if (evt.keyCode === 32){
        jump();
    }
    if (evt.keyCode === 13){
        if (started == false){
            start();
        }
    }
})

function jump(){
    if (started == true){
        if (character.classList != "animate"){
            character.classList.add("animate");
        }
    }
    setTimeout(function(){
        if (character.classList = "animate"){
            character.classList.remove("animate");
        }
    }, 500);;
}

var checkDead = setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if (started == true){
        if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130){
            if (die == true){
                stop()
            } else {
                if (score - last1k > 50){
                    score = score + 1000;
                    last1k = score;
                    document.getElementById("block").style.display = "none";
                    setTimeout(function(){
                        document.getElementById("block").style.display = "block";
                    }, 100);
                }
            }
        } else {
            score = score + 1;
            document.getElementById("score").innerHTML = numComma(score);
        }
        if (die == true){
            block.style.backgroundImage = "url(https://i.imgur.com/3o2rHAK.png)";
        } else {
            block.style.backgroundImage = "url(https://i.imgur.com/MnigElB.png)";
        }
    }
}, 10);

function stop(){
    var newhs = false;
    document.getElementById("score").innerHTML = numComma(score);
    if (score > highscore){
        newhs = true;
        highscore = score;
    }
    document.getElementById("highscore").innerHTML = "High score: " + numComma(highscore);
    setTimeout(function(){
        if (newhs == true){
            alert("You lose!\nScore: " + numComma(score) + "\nNew high score!");
        } else{
            alert("You lose!\nScore: " + numComma(score));
        }
        block.style.animation = "none";
        block.style.display = "none";
        started = false;
        score = 0;
        document.getElementById("score").innerHTML = 0;
        die = true;
        document.getElementById("button").innerHTML = "Start (enter)";
    }, 1);
}

function start(){
    started = true;
    document.getElementById("highscore").innerHTML = "High score: " + numComma(highscore);
    block.style.display = "block";
    block.style.animation = "block 1200ms infinite linear";
    document.getElementById("button").innerHTML = "Jump (space)";
    var interval = setInterval(function(){
        if (started == true){
            var int = randomInt(1, 10);
            if (int == 1){
                die = false;
            } else{
                die = true;
            }
        } else clearInterval(interval);;
    }, 1200);
}

function numComma(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}