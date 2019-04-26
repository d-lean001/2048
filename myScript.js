/*
Still to do:
1) bug... if board is full, but still able to make a move, still gameover.
  should be able to make a move first before actual game over.


*/

var win = 0;
var loss = 0;
var gameLost = false;
var tileMoved = false;

//document.getElementById("dl").style.backgroundColor = "blue";

var boardArray = [
  [
    {value:Number(document.getElementById("uull").innerHTML), combined:false, elementId:"uull"},
    {value:Number(document.getElementById("uul").innerHTML), combined:false, elementId:"uul"},
    {value:Number(document.getElementById("uur").innerHTML), combined:false, elementId:"uur"},
    {value:Number(document.getElementById("uurr").innerHTML), combined:false, elementId:"uurr"}
  ],
  [
    {value:Number(document.getElementById("ull").innerHTML), combined:false, elementId:"ull"},
    {value:Number(document.getElementById("ul").innerHTML), combined:false, elementId:"ul"},
    {value:Number(document.getElementById("ur").innerHTML), combined:false, elementId:"ur"},
    {value:Number(document.getElementById("urr").innerHTML), combined:false, elementId:"urr"}
  ],
  [
    {value:Number(document.getElementById("dll").innerHTML), combined:false, elementId:"dll"},
    {value:Number(document.getElementById("dl").innerHTML), combined:false, elementId:"dl"},
    {value:Number(document.getElementById("dr").innerHTML), combined:false, elementId:"dr"},
    {value:Number(document.getElementById("drr").innerHTML), combined:false, elementId:"drr"}
  ],
  [
    {value:Number(document.getElementById("ddll").innerHTML), combined:false, elementId:"ddll"},
    {value:Number(document.getElementById("ddl").innerHTML), combined:false, elementId:"ddl"},
    {value:Number(document.getElementById("ddr").innerHTML), combined:false, elementId:"ddr"},
    {value:Number(document.getElementById("ddrr").innerHTML), combined:false, elementId:"ddrr"}
  ]
];

document.onkeydown = function(key) {
  if(key.keyCode == 37) {
    console.log("Left arrow", key.keyCode)
    leftButtonPress();
  }
  else if(key.keyCode == 38) {
    console.log("Up arrow", key.keyCode);
    upButtonPress();
  }
  else if(key.keyCode == 39) {
    console.log("Right arrow", key.keyCode);
    rightButtonPress();
  }
  else if(key.keyCode == 40) {
    console.log("Down arrow", key.keyCode);
    downButtonPress();
  }
  else {
    console.log("other key pressed", key.keyCode)
  }
}

function moveElement(increasingElement, element, newElementRow, newElementCol) {
  boardArray[newElementRow][newElementCol].value = increasingElement + element;
  tileMoved = true;
}

function deleteElement(row, col) {
  boardArray[row][col].value = 0;
}

function newElement() {
  do {
    var newRow = Math.floor(Math.random() * 4);
    var newCol = Math.floor(Math.random() * 4);
    console.log("row = ", newRow, " col = ", newCol);
  } while(boardArray[newRow][newCol].value !== 0);

  var newElementNum = (Math.floor(Math.random() * 3) + 1) * 2;
  if(newElementNum === 6) {
    newElementNum = 8;
  }
  console.log("new number = ", newElementNum);

  boardArray[newRow][newCol].value = newElementNum;
  changeElementColor(newRow, newCol);
}

function displayBoard() {
  document.getElementById("uull").innerHTML = boardArray[0][0].value;
  document.getElementById("uul").innerHTML = boardArray[0][1].value;
  document.getElementById("uur").innerHTML = boardArray[0][2].value;
  document.getElementById("uurr").innerHTML = boardArray[0][3].value;

  document.getElementById("ull").innerHTML = boardArray[1][0].value;
  document.getElementById("ul").innerHTML = boardArray[1][1].value;
  document.getElementById("ur").innerHTML = boardArray[1][2].value;
  document.getElementById("urr").innerHTML = boardArray[1][3].value;

  document.getElementById("dll").innerHTML = boardArray[2][0].value;
  document.getElementById("dl").innerHTML = boardArray[2][1].value;
  document.getElementById("dr").innerHTML = boardArray[2][2].value;
  document.getElementById("drr").innerHTML = boardArray[2][3].value;

  document.getElementById("ddll").innerHTML = boardArray[3][0].value;
  document.getElementById("ddl").innerHTML = boardArray[3][1].value;
  document.getElementById("ddr").innerHTML = boardArray[3][2].value;
  document.getElementById("ddrr").innerHTML = boardArray[3][3].value;
}

function clearBoard() {
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      boardArray[i][j].value = 0;
      boardArray[i][j].combined = false;
      changeElementColor(i, j);
    }
  }
  displayBoard();
}

function checkBoard() {
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      changeElementColor(i, j);
      if(boardArray[i][j].value === 2049){
        window.alert("Congrats! You Win!")
        return;
      }
    }
  }
  if(gameLost === true){
    window.alert("Game Over. Click New Game to start over.");
  }
  else{
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(boardArray[i][j].value === 0){
          return;
        }
      }
    }
    gameLost = true;
  }
}

function clearCombinedAndTileMoved() {
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      boardArray[i][j].combined = false;
    }
  }
  tileMoved = false;
}

function changeElementColor(row, col) {
  var elementVal = boardArray[row][col].value;
  console.log(elementVal);
  switch(elementVal) {
    case 0:
      document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "white";
      break;
    case 2:
      document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#ffff99";
      break;
    case 4:
      document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#ffff66";
      break;
    case 8:
      document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#ffff00";
      break;
    case 16:
      document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#ccffcc";
      break;
    case 32:
      document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#99ff99";
      break;
    case 64:
      document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#66ff66";
      break;
    case 128:
      document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#ccffff";
      break;
    case 256:
      document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#66ffff";
      break;
    case 512:
      document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#00ffff";
      break;
    case 1024:
      document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#ff9966";
      break;
    case 2048:
      document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "red";
      break;
  }
}

function newGameButtonPress() {
  gameLost = false;
  clearBoard();
  newElement();
  newElement();
  displayBoard();
}

function upButtonPress() {
  console.log("Up is pressed");

  for(var k = 0; k < 4; k++) {
    for(var i = 0; i < 3; i++) {
      for(var j = 0; j < 4; j++) {
        if(boardArray[i][j].value === boardArray[i+1][j].value &&
        boardArray[i][j].combined === false &&
        boardArray[i+1][j].combined === false &&
        boardArray[i][j].value !== 0) {
          moveElement(boardArray[i][j].value, boardArray[i+1][j].value, i, j);
          boardArray[i][j].combined = true;
          deleteElement(i+1, j);
        }
        else if(boardArray[i][j].value === 0 && boardArray[i+1][j].value !== 0) {
          moveElement(boardArray[i][j].value, boardArray[i+1][j].value, i, j);
          deleteElement(i+1, j);
        }
        else {
        }
      }
    }
  }
  console.log("tileMoved = ", tileMoved);
  if(tileMoved === true) {
    newElement();
  }
  displayBoard();
  checkBoard();
  clearCombinedAndTileMoved();
}

function downButtonPress() {
  console.log("Down is pressed");

  for(var k = 0; k < 4; k++) {
    for(var i = 3; i > 0; i--) {
      for(var j = 0; j < 4; j++) {
        if(boardArray[i][j].value === boardArray[i-1][j].value &&
        boardArray[i][j].combined === false &&
        boardArray[i-1][j].combined === false &&
        boardArray[i-1][j].value !== 0) {
          moveElement(boardArray[i][j].value, boardArray[i-1][j].value, i, j);
          boardArray[i][j].combined = true;
          deleteElement(i-1, j);
        }
        else if(boardArray[i][j].value === 0 && boardArray[i-1][j].value !== 0) {
          moveElement(boardArray[i][j].value, boardArray[i-1][j].value, i, j);
          deleteElement(i-1, j);
        }
        else {
        }
      }
    }
  }
  console.log("tileMoved = ", tileMoved);
  if(tileMoved === true) {
    newElement();
  }
  displayBoard();
  checkBoard();
  clearCombinedAndTileMoved();
}

function leftButtonPress() {
  console.log("Left is pressed");

  for(var k = 0; k < 4; k++) {
    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < 3; j++) {
        if(boardArray[i][j].value === boardArray[i][j+1].value &&
        boardArray[i][j].combined === false &&
        boardArray[i][j+1].combined === false &&
        boardArray[i][j].value !== 0) {
          moveElement(boardArray[i][j].value, boardArray[i][j+1].value, i, j);
          boardArray[i][j].combined = true;
          deleteElement(i, j+1);
        }
        else if(boardArray[i][j].value === 0 && boardArray[i][j+1].value !== 0) {
          moveElement(boardArray[i][j].value, boardArray[i][j+1].value, i, j);
          deleteElement(i, j+1);
        }
        else {
        }
      }
    }
  }
  console.log("tileMoved = ", tileMoved);
  if(tileMoved === true) {
    newElement();
  }
  displayBoard();
  checkBoard();
  clearCombinedAndTileMoved();
}

function rightButtonPress() {
  console.log("Right is pressed");

  for(var k = 0; k < 4; k++) {
    for(var i = 0; i < 4; i++) {
      for(var j = 3; j > 0; j--) {
        if(boardArray[i][j].value === boardArray[i][j-1].value &&
        boardArray[i][j].combined === false &&
        boardArray[i][j-1].combined === false &&
        boardArray[i][j-1].value !== 0) {
          moveElement(boardArray[i][j].value, boardArray[i][j-1].value, i, j);
          boardArray[i][j].combined = true;
          deleteElement(i, j-1);
        }
        else if(boardArray[i][j].value === 0 && boardArray[i][j-1].value !== 0) {
          moveElement(boardArray[i][j].value, boardArray[i][j-1].value, i, j);
          deleteElement(i, j-1);
        }
        else {
        }
      }
    }
  }
  console.log("tileMoved = ", tileMoved);
  if(tileMoved === true) {
    newElement();
  }
  displayBoard();
  checkBoard();
  clearCombinedAndTileMoved();
}





//current test in progress
/* recursive up button press... not really sure if this is better than normal.
function recUpButtonPress(currentRow, currentCol, currentElement) {
  console.log("currentRow = ", currentRow, "...currentCol = ", currentCol, "...currentElement = ", currentElement);
  if(currentRow === 0) {
    console.log("inside if");
    boardArray[currentRow][currentCol] = currentElement;
    return;
  }
  else if(boardArray[currentRow-1][currentCol] === 0) {
    console.log("calling recursion - ", currentRow);
    recUpButtonPress(currentRow-1, currentCol, currentElement);
    console.log("out of recursion - ", currentRow);
    deleteElement(currentRow, currentCol);
  }
  else if(currentElement === boardArray[currentRow-1][currentCol]){
    console.log("found same numbers");
    boardArray[currentRow-1][currentCol] = currentElement * 2;
    deleteElement(currentRow, currentCol);
    return;
  }
  else {
    console.log("inside else");
    boardArray[currentRow][currentCol] = currentElement;
    return;
  }
}



function currentTestPress() {
  //document.getElementById("currentTest").innerHTML = "No test being performed.";
  console.log("Testing recursive up button press");
  for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
      recUpButtonPress(i, j, boardArray[i][j]);
      displayBoard();
    }
  }
}
*/


function currentTestPress() {
  //document.getElementById("currentTest").innerHTML = "No test being performed.";
  boardArray[1][1].color = 4;
  changeElementColor(0,1);

}

//for checking what's in the arrays
function boardButtonPress() {
  console.log(boardArray[0][0], boardArray[0][1], boardArray[0][2], boardArray[0][3]);
  console.log(boardArray[1][0], boardArray[1][1], boardArray[1][2], boardArray[1][3]);
  console.log(boardArray[2][0], boardArray[2][1], boardArray[2][2], boardArray[2][3]);
  console.log(boardArray[3][0], boardArray[3][1], boardArray[3][2], boardArray[3][3]);
}
