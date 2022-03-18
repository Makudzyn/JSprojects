let guessingWords = ["javascript", "apple", "notebook", "wolf", "phone", "monster"];
let secretWord = [], hp = 8;
let guessWord = guessingWords[Math.floor(Math.random() * guessingWords.length)];
for (let i = 0; i < guessWord.length; i++){
    secretWord[i] = "_";
}

let tries = 0, enteredLetters = [];

let minutes = 0, seconds = 0, interval;
const minutesCount = document.getElementById("minutesElement");
const secondsCount = document.getElementById("secondsElement");

document.getElementById("secretWordArea").innerHTML = secretWord.join(" ");

document.getElementById("enterLetter").addEventListener("click", function () {
   let usersLetter = document.getElementById("enterSpaceArea").value;
    document.getElementById("enterSpaceArea").value = "";
   if (usersLetter === ""){
       printInfo("Вы ничего не ввели!");
   }
   if (usersLetter.length > 1){
       printInfo("Вы ввели больше одной буквы! Если хотите ввести слово целиком нажмите другую кнопку.");
   }
    if (/[^A-zА-яЁё]/.test(usersLetter)){
        printInfo("Нельзя вводить цифры и символы!");
    }
    if (tries === 0){
        enteredLetters.push(usersLetter);
    }else if(tries !== 0){
        for (let i = 0; i < enteredLetters.length; i++){
            if (usersLetter === enteredLetters[i]){
                printInfo("Вы уже вводили такую букву!");
            }else if(usersLetter !== enteredLetters[i]){
                enteredLetters.push(usersLetter);
            }
        }
    }

    if (tries === 0) {
        clearInterval(interval);
        interval = setInterval(timerStart, 1000);
    }

    tries++;
});

function printInfo(str){
    document.getElementById("gameInfo").innerText = str;
    return;
}

function timerStart(){
    seconds++;
    if (seconds <= 9){
        secondsCount.innerText = "0" + seconds;
    }
    if(seconds > 9){
        secondsCount.innerText = seconds;
    }
    if(seconds > 59){
        minutes++;
        minutesCount.innerText = "0" + minutes;
        seconds = 0;
        secondsCount.innerText = "0" + seconds;
    }

    if (minutes <= 9){
        minutesCount.innerText = "0" + minutes;
    }
    if(minutes > 9){
        minutesCount.innerText = minutes;
    }
    if(seconds > 59){
        printInfo("Ну и ну! Потратить час на отгадывание слова, никуда не годится, вы проиграли!");
    }
}