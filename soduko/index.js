const easy = [
    // "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    // "685329174971485326234761859362574981549618732718293465823946517197852643456137298",
    "-4----179--2--8-54--6--5--8-8--7-91--5--9--3--19-6--4-3--4--7--57-1--2--928----6-",
    "845632179732918654196745328683574912457291836219863547361429785574186293928357461"
];
const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3---",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];


var timer;
var timeRemaining;
var lives;
var hints;
var selectedNum;
var selectedTile;
var disableSelect;
window.onload = function () {
    id("start-btn").addEventListener("click", startGame);
    for (let i = 0; i < id("number-container").children.length; i++) {
        id("number-container").children[i].addEventListener("click", function () {
            if (!disableSelect) {
                if (this.classList.contains("selected")) {
                    this.classList.remove("selected");
                    selectedNum = null;
                } else {
                    for (let i = 0; i < 9; i++) {
                        id("number-container").children[i].classList.remove("selected");
                    }
                    this.classList.add("selected");
                    selectedNum = this;
                    updateMove();
                }
            }
        });
    }

}
var htime = setInterval(() => {
    if (hints < 1) {
        id("hints").textContent = "";

    }
}, 1000);

function getBoard(i) {
    let board;
    if (id("diff-1").checked) board = easy[i];
    else if (id("diff-2").checked) board = medium[i];
    else board = hard[i];
    return board;
}

function startGame() {
    let board = getBoard(0)
    lives = 3;
    hints = 3;
    disableSelect = false;
    id("lives").textContent = "Lives Remaining: 3";
    id("hints").textContent = "3 hints left";
    id("provide").textContent = "Get answer";
    id("provide").addEventListener("click", give_answers)

    id("hints").addEventListener("click", give_hints)
    generateBoard(board);

    startTimer();
    if (id("theme-1").checked) {
        qs("body").classList.remove("dark")
    } else {

        qs("body").classList.add("dark")
    }
    id("number-container").classList.remove("hidden")
}

function startTimer() {
    if (id("time-1").checked) timeRemaining = 180;
    else if (id("time-2").checked) timeRemaining = 300;
    else timeRemaining = 600;
    id("timer").textContent = timeConversion(timeRemaining);
    timer = setInterval(function () {
        timeRemaining--;
        if (timeRemaining == 0) endGame();
        id("timer").textContent = timeConversion(timeRemaining)
    }, 1000)

}

function timeConversion(time) {
    let minutes = Math.floor(time / 60);
    if (minutes < 10) minutes = "0" + minutes;
    let seconds = time % 60;
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}

function generateBoard(board) {

    clearPrevious();
    let idCount = 0;
    for (var i = 0; i < 81; i++) {
        let tile = document.createElement("p");
        tile.addEventListener("click", getAnswer)

        if (board.charAt(i) != "-") {
            tile.textContent = board.charAt(i);
        } else {
            tile.addEventListener("click", function () {
                if (!disableSelect) {
                    if (tile.classList.contains("selected")) {
                        tile.classList.remove("selected");
                        selectedTile = null;
                    } else {
                        for (let i = 0; i < 81; i++) {
                            qsa(".tile")[i].classList.remove("selected");
                        }
                        tile.classList.add("selected");
                        selectedTile = tile;
                        updateMove();
                    }
                }
            });
        }
        tile.id = idCount;
        idCount++;
        tile.classList.add("tile");

        if ((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54)) {

            tile.classList.add("bottomBorder")
        }
        if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6) {
            tile.classList.add("rightBorder")
        }
        id("board").appendChild(tile);
    }

}


function give_hints() {
    if (hints > 0) {
        let solution = getBoard(1);
        hints--;

        let tiles = qsa(".tile");
        var x;
        for (var i = 0; i < tiles.length; i++) {
            if (tiles[i].textContent === "") {
                x = i;
                break;
            }
        }
        tiles[x].textContent = solution.charAt(x);
        id("hints").textContent = hints + " hints left ";
    }
}


function clearPrevious() {
    let tiles = qsa(".tile");
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].remove();
    }
    if (timer) clearTimeout(timer);
    for (let i = 0; i < id("number-container").children.length; i++) {
        id("number-container").children[i].classList.remove("selected");
    }
    selectedTile = null;
    selectedNum = null;
}

function updateMove() {

    if (selectedTile && selectedNum) {
        selectedTile.textContent = selectedNum.textContent;
        if (checkCorrect(selectedTile)) {
            selectedTile.classList.remove("selected");
            selectedNum.classList.remove("selected");
            selectedNum = null;
            selectedTile = null;
            if (checkDone()) {
                endGame();
            }
        } else {
            disableSelect = true;
            selectedTile.classList.add("incorrect");
            setTimeout(() => {
                lives--
                if (lives == 0) {
                    endGame()
                } else {
                    id("lives").textContent = "Lives Remaining: " + lives;
                    disableSelect = false;
                }
                selectedTile.classList.remove("incorrect");
                selectedTile.classList.remove("selected");
                selectedNum.classList.remove("selected");
                selectedTile.textContent = "";
                selectedTile = null;
                selectedNum = null;
            }, 1000);
        }
    }
}

function checkDone() {


    let tiles = qsa(".tile");

    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i].textContent === "") {
            return false;
        }
    }
    return true;
}

function checkCorrect(tile) {
    let solution = getBoard(1);
    if (solution.charAt(tile.id) === tile.textContent) return true;
    else return false;
}



function qs(selector) {
    return document.querySelector(selector)
}

function qsa(selector) {
    return document.querySelectorAll(selector)
}

function id(id) {
    return document.getElementById(id);
}

function endGame() {
    clearInterval(htime);
    disableSelect = true;
    clearTimeout(timer);
    if (lives === 0 || timeRemaining == 0) {
        id("lives").textContent = "You lost";

    } else {
        id("lives").textContent = "You win";
    }

}

function getAnswer(e) {
    var solution = getBoard(1)
    console.log(solution[e.target.id]);
}

function give_answers() {
    var solution = getBoard(1);
    let tiles = qsa(".tile");
    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i].textContent === "") {
            tiles[i].textContent = solution.charAt(i);
        }
    }
    endGame();
    id("lives").textContent = "";


}