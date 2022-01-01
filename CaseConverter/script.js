let areaText = document.getElementById("text");

let upperCase = document.getElementById("upper-case");
upperCase.addEventListener("click", function () {
    areaText.value = areaText.value.toUpperCase();
});

let lowerCase = document.getElementById("lower-case");
lowerCase.addEventListener("click", function () {
    areaText.value = areaText.value.toLowerCase();
});

let properCase = document.getElementById("proper-case");
properCase.addEventListener("click",
    function () {
        let tmp = areaText.value.split("");
        tmp[0] = tmp[0].toUpperCase();
        for (let i = 0; i < tmp.length; i++){
            if (tmp[i-1] === ' ' && tmp[i] !== ' ')
                tmp[i] = tmp[i].toUpperCase();
        }
        areaText.value = tmp.join("");
});

let sentenceCase = document.getElementById("sentence-case");
sentenceCase.addEventListener("click", function (){
    areaText.value = areaText.value.toLowerCase();
    let tmp = areaText.value.split("");
    tmp[0] = tmp[0].toUpperCase();
    for (let i = 0; i < tmp.length; i++){
        if (tmp[i-1] === '.' && tmp[i] === ' ' && tmp[i+1] !== ' ')
            tmp[i+1] = tmp[i+1].toUpperCase();
    }
    areaText.value = tmp.join("");
});

let saveFile = document.getElementById("save-text-file");
saveFile.addEventListener("click", function() { download("text.txt", areaText.value);});

function download(filename, text) {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Start file download.
/*download("text.txt", areaText.value);*/
    

    
