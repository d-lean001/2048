/*
Still to do:
1) fix bug... all numbers on same row are the same, go
  left, instead of having 2 numbers on the far 2 left spots that are only a
  combination of 2 of the numbers, displaying only 1 number that is a
  combination of all 4.
2) fix bug... if nothing moves, it should not count as a move and should not
  create a new element

*/

var win = 0;
var loss = 0;
var gameLost = false;

var boardArray = [
  [
    Number(document.getElementById("uull").innerHTML),
    Number(document.getElementById("uul").innerHTML),
    Number(document.getElementById("uur").innerHTML),
    Number(document.getElementById("uurr").innerHTML)
  ],
  [
    Number(document.getElementById("ull").innerHTML),
    Number(document.getElementById("ul").innerHTML),
    Number(document.getElementById("ur").innerHTML),
    Number(document.getElementById("urr").innerHTML)
  ],
  [
    Number(document.getElementById("dll").innerHTML),
    Number(document.getElementById("dl").innerHTML),
    Number(document.getElementById("dr").innerHTML),
    Number(document.getElementById("drr").innerHTML)
  ],
  [
    Number(document.getElementById("ddll").innerHTML),
    Number(document.getElementById("ddl").innerHTML),
    Number(document.getElementById("ddr").innerHTML),
    Number(document.getElementById("ddrr").innerHTML)
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
  boardArray[newElementRow][newElementCol] = increasingElement + element;
}

function deleteElement(row, col) {
  boardArray[row][col] = 0;
}

function newElement() {
  do {
    var newRow = Math.floor(Math.random() * 4);
    var newCol = Math.floor(Math.random() * 4);
    console.log("row = ", newRow);
    console.log("col = ", newCol);
  } while(boardArray[newRow][newCol] !== 0);

  var newElementNum = (Math.floor(Math.random() * 3) + 1) * 2;
  if(newElementNum === 6) {
    newElementNum = 8;
  }
  console.log("new number = ", newElementNum);

  boardArray[newRow][newCol] = newElementNum;
}

function displayBoard() {
  document.getElementById("uull").innerHTML = boardArray[0][0];
  document.getElementById("uul").innerHTML = boardArray[0][1];
  document.getElementById("uur").innerHTML = boardArray[0][2];
  document.getElementById("uurr").innerHTML = boardArray[0][3];

  document.getElementById("ull").innerHTML = boardArray[1][0];
  document.getElementById("ul").innerHTML = boardArray[1][1];
  document.getElementById("ur").innerHTML = boardArray[1][2];
  document.getElementById("urr").innerHTML = boardArray[1][3];

  document.getElementById("dll").innerHTML = boardArray[2][0];
  document.getElementById("dl").innerHTML = boardArray[2][1];
  document.getElementById("dr").innerHTML = boardArray[2][2];
  document.getElementById("drr").innerHTML = boardArray[2][3];

  document.getElementById("ddll").innerHTML = boardArray[3][0];
  document.getElementById("ddl").innerHTML = boardArray[3][1];
  document.getElementById("ddr").innerHTML = boardArray[3][2];
  document.getElementById("ddrr").innerHTML = boardArray[3][3];

  console.log("full board array:");
  console.log(boardArray[0]);
  console.log(boardArray[1]);
  console.log(boardArray[2]);
  console.log(boardArray[3]);
}

function clearBoard() {
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      boardArray[i][j] = 0;
    }
  }
  displayBoard();
}

function checkBoard() {
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      if(boardArray[i][j] === 0){
        return;
      }
    }
  }
  gameLost = true;
  window.alert("Game Over");
}

function newGameButtonPress() {
  gameLost = false;
  clearBoard();
  newElement();
  newElement();
}

function upButtonPress() {
  console.log("Up is pressed");

  if(gameLost === false) {
    for(var k = 0; k < 4; k++) {
      for(var i = 3; i > 0; i--) {
        for(var j = 0; j < 4; j++) {
          if(boardArray[i][j] === boardArray[i-1][j] || boardArray[i-1][j] === 0){
            moveElement(boardArray[i-1][j], boardArray[i][j], i-1, j);
            deleteElement(i, j);
          }
        }
      }
    }
    newElement();
    displayBoard();
    checkBoard();
  }
  else {
    console.log("Gameover. Need to restart game.");
    window.alert("Please click New Game to continue.");
  }
}

function downButtonPress() {
  console.log("Down is pressed");

  if(gameLost === false) {
    for(var k = 0; k < 4; k++) {
      for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 4; j++) {
          if(boardArray[i][j] === boardArray[i+1][j] || boardArray[i+1][j] === 0){
            moveElement(boardArray[i+1][j], boardArray[i][j], i+1, j);
            deleteElement(i, j);
          }
        }
      }
    }
    newElement();
    displayBoard();
    checkBoard();
  }
  else {
    console.log("Gameover. Need to restart game.");
    window.alert("Please click New Game to continue.");
  }
}

function leftButtonPress() {
  console.log("Left is pressed");

  if(gameLost === false) {
    for(var k = 0; k < 4; k++) {
      for(var i = 0; i < 4; i++) {
        for(var j = 3; j > 0; j--) {
          if(boardArray[i][j] === boardArray[i][j-1] || boardArray[i][j-1] === 0){
            moveElement(boardArray[i][j-1], boardArray[i][j], i, j-1);
            deleteElement(i, j);
          }
        }
      }
    }
    newElement();
    displayBoard();
    checkBoard();
  }
  else {
    console.log("Gameover. Need to restart game.");
    window.alert("Please click New Game to continue.");
  }
}

function rightButtonPress() {
  console.log("Right is pressed");

  if(gameLost === false) {
    for(var k = 0; k < 4; k++) {
      for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 3; j++) {
          if(boardArray[i][j] === boardArray[i][j+1] || boardArray[i][j+1] === 0){
            moveElement(boardArray[i][j+1], boardArray[i][j], i, j+1);
            deleteElement(i, j);
          }
        }
      }
    }
    newElement();
    displayBoard();
    checkBoard();
  }
  else {
    console.log("Gameover. Need to restart game.");
    window.alert("Please click New Game to continue.");
  }
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
