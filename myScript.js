/*
Still to do:
1)


*/

var win = 0;
var loss = 0;
var gameLost = false;
var tileMoved = false;


var boardArray = [
  [
    {value:Number(document.getElementById("uull").innerHTML), combined:false},
    {value:Number(document.getElementById("uul").innerHTML), combined:false},
    {value:Number(document.getElementById("uur").innerHTML), combined:false},
    {value:Number(document.getElementById("uurr").innerHTML), combined:false}
  ],
  [
    {value:Number(document.getElementById("ull").innerHTML), combined:false},
    {value:Number(document.getElementById("ul").innerHTML), combined:false},
    {value:Number(document.getElementById("ur").innerHTML), combined:false},
    {value:Number(document.getElementById("urr").innerHTML), combined:false}
  ],
  [
    {value:Number(document.getElementById("dll").innerHTML), combined:false},
    {value:Number(document.getElementById("dl").innerHTML), combined:false},
    {value:Number(document.getElementById("dr").innerHTML), combined:false},
    {value:Number(document.getElementById("drr").innerHTML), combined:false}
  ],
  [
    {value:Number(document.getElementById("ddll").innerHTML), combined:false},
    {value:Number(document.getElementById("ddl").innerHTML), combined:false},
    {value:Number(document.getElementById("ddr").innerHTML), combined:false},
    {value:Number(document.getElementById("ddrr").innerHTML), combined:false}
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
    }
  }
  displayBoard();
}

function checkBoard() {
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      if(boardArray[i][j].value === 2048){
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
var objectArr = [
  [{value:2, combined:false}, {value:4, combined:false}],
  [{value:8, combined:true}, {value:16, combined:true}]
];

function currentTestPress() {
  //document.getElementById("currentTest").innerHTML = "No test being performed.";
  console.log("obejectArr[0][0] value = ", objectArr[0][0].value);
  console.log("obejectArr[0][0] combined = ", objectArr[0][0].combined);
  console.log("obejectArr[1][0] value = ", objectArr[1][0].value);
  console.log("obejectArr[1][0] combined = ", objectArr[1][0].combined);

}

//for checking what's in the arrays
function boardButtonPress() {
  console.log(boardArray[0][0], boardArray[0][1], boardArray[0][2], boardArray[0][3]);
  console.log(boardArray[1][0], boardArray[1][1], boardArray[1][2], boardArray[1][3]);
  console.log(boardArray[2][0], boardArray[2][1], boardArray[2][2], boardArray[2][3]);
  console.log(boardArray[3][0], boardArray[3][1], boardArray[3][2], boardArray[3][3]);
}
