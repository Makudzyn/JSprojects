let guessingWords = ["javascript", "apple", "notebook", "wolf", "phone", "monster"];
let secretWord = [], hp = 8;
let rightAnswer = false, letterUsed = false;
let guessWord = guessingWords[Math.floor(Math.random() * guessingWords.length)];
for (let i = 0; i < guessWord.length; i++){
    secretWord[i] = "_";
}

document.getElementById("hpElement").innerText = hp;

let tries = 0, enteredLetters = [];

let minutes = 0, seconds = 0, interval;
const minutesCount = document.getElementById("minutesElement");
const secondsCount = document.getElementById("secondsElement");

document.getElementById("secretWordArea").innerText = secretWord.join(" ");

document.getElementById("enterLetter").addEventListener("click", function () {
   let usersLetter = document.getElementById("enterSpaceArea").value;
    document.getElementById("enterSpaceArea").value = "";

   if (usersLetter === ""){
       printInfo("Вы ничего не ввели!");
       return;
   }
   if (usersLetter.length > 1){
       printInfo("Вы ввели больше одной буквы! Если хотите ввести слово целиком нажмите другую кнопку.");
       return;
   }
    if (/[^A-zА-яЁё]/.test(usersLetter)){
        printInfo("Нельзя вводить цифры и символы!");
        return;
    }

    if(tries !== 0){
        for (let i = 0; i <= enteredLetters.length; i++){
            if (usersLetter === enteredLetters[i]){
                printInfo("Вы уже вводили такую букву!");
                letterUsed = true;
                return;
            }
        }
        if(letterUsed === false){
            enteredLetters.push(usersLetter);
        }

    }else if (tries === 0) {
        enteredLetters.push(usersLetter);
    }

    if (tries === 0) {
        clearInterval(interval);
        interval = setInterval(timerStart, 1000);
    }
    tries++;


    for (let i = 0; i < guessWord.length; i++){
        if(guessWord[i] === usersLetter){
            printInfo("Верно! Вы отгадали букву.");
            secretWord[i] = usersLetter;
            document.getElementById("secretWordArea").innerText = secretWord.join(" ");
            rightAnswer = true;
            if (guessWord === secretWord.join("")){
                printInfo("Вы отгадали слово!!!");
                clearInterval(interval);
                gameEnd(hp);
            }
        }else if(i === guessWord.length - 1 && rightAnswer === false){
            printInfo("Такой буквы нет в загаданном слове! Попробуйте снова.");
            hp--;
            document.getElementById("hpElement").innerText = hp;
            if (hp === 0){
                printInfo("Попытки кончились, вы не смогли отгадать слово...");
                guessWord = guessWord.split("");
                document.getElementById("secretWordArea").innerText = guessWord.join(" ");
                clearInterval(interval);
                gameEnd(hp);
            }
            return;
        }
    }

    letterUsed = false;
    rightAnswer = false;

});

function printInfo(str){
    document.getElementById("gameInfo").innerText = str;
}

function gameEnd(hpLeft){
    document.getElementById("endGameInfo").style.visibility = 'visible';
    document.getElementById("endGameInfo").style.opacity = '1';
    document.querySelector(".container").style.filter = 'blur(2px)';

    if (hpLeft !== 0){
        document.getElementById("endGameInfo").innerText = "Поздравляю, у вас получилось отгадать слово!";
    }else if(hpLeft === 0){
        document.getElementById("endGameInfo").innerText = "К сожалению у вас не получилось отгадать слово...";
    }
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
    if(minutes > 59){
        printInfo("Ну и ну! Потратить час на отгадывание слова, никуда не годится, вы проиграли!");
    }
}