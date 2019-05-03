/*
Still to do:
1) bug... if board is full, but still able to make a move, still gameover.
  should be able to make a move first before actual game over.
  ===> half fixed. made flags to check if any movement was done in any direction
    if movement was attempted in all directions but nothing moved, this means game over


*/
// (let || const) > var
// let for changing, const for permanent
// This statement should give you a good idea of Javascript:
// "Don't use var, it's never right. We made something better but couldn't remove it"
//    - Someone, Probably

// DL: lol, makes more sense. changing all variable types.
/*var gameLost = false;
var tileMoved = false;
var noMoveUp = false;
var noMoveDown = false;
var noMoveLeft = false;
var noMoveRight = false;
*/
let gameLost = false;
let tileMoved = false;
let noMoveUp = false;
let noMoveDown = false;
let noMoveLeft = false;
let noMoveRight = false;


// I'd say remove this whole array definition
// It's only pulling the initial state from the HTML, which isn't random and arguably wrong.
// Keep the board state somewhere, you just might not need this initialization
// We're pushing data to the UI, and the only input we care about is our event handlers, so we're mostly a push model

// DL: removed pulling data from html. instead just initialized values to 0 for now. will rethink this later.
var boardArray = [
  [
    {value:0, combined:false, elementId:"uull"},
    {value:0, combined:false, elementId:"uul"},
    {value:0, combined:false, elementId:"uur"},
    {value:0, combined:false, elementId:"uurr"}
  ],
  [
    {value:0, combined:false, elementId:"ull"},
    {value:0, combined:false, elementId:"ul"},
    {value:0, combined:false, elementId:"ur"},
    {value:0, combined:false, elementId:"urr"}
  ],
  [
    {value:0, combined:false, elementId:"dll"},
    {value:0, combined:false, elementId:"dl"},
    {value:0, combined:false, elementId:"dr"},
    {value:0, combined:false, elementId:"drr"}
  ],
  [
    {value:0, combined:false, elementId:"ddll"},
    {value:0, combined:false, elementId:"ddl"},
    {value:0, combined:false, elementId:"ddr"},
    {value:0, combined:false, elementId:"ddrr"}
  ]
];

const numRows = boardArray.length;
const numCols = boardArray[0].length;

/*
  Javascript 'evolution' tidbit:
  https://caniuse.com/#feat=arrow-functions
  function(arg1, arg2) {

  }
  is equivalent to
  (arg1, arg2) => {

  }
  because people got tired of writing `function`
*/
document.onkeydown = function(key) {
  // If there's a nested value repeatedly referenced, I'd say pull it out into a variable.
  // const keyCode = key.keyCode
  /*
    Javascript 'evolution' tidbit:
    Destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    You can define variables from an object immediately!
    Instead of
    document.onkeydown = function(key) {
      const keyCode = key.keyCode;
      ...
    }
    You can do
    document.onkeydown = function({ keyCode }}) {
      ...
    }
  */
  if(key.keyCode == 37) {
    console.log("Left arrow ", key.keyCode);
    leftButtonPress();
  }
  else if(key.keyCode == 38) {
    console.log("Up arrow ", key.keyCode);
    upButtonPress();
  }
  else if(key.keyCode == 39) {
    console.log("Right arrow ", key.keyCode);
    rightButtonPress();
  }
  else if(key.keyCode == 40) {
    console.log("Down arrow ", key.keyCode);
    downButtonPress();
  }
  else {
    console.log("other key pressed ", key.keyCode);
  }
  // switch > elseif
}

/*
Here's how I'd write it:
document.onkeydown = ({ keyCode }) => {
  switch(keyCode) {
    case 37:
      leftButtonPress();
      break;
    case 38:
      upButtonPress();
      break;
    case 39:
      rightButtonPress();
      break;
    case 40:
      downButtonPress();
      break;
    default:
      console.error('Unknown keycode:', keyCode);
  }
}
*/


function moveElement(increasingElement, element, newElementRow, newElementCol) {
  console.log("moving element: ", element, " into element: ", increasingElement, " at row, col: ", newElementRow, ", ", newElementCol);
  // I don't think we need this to be a separate utility
  boardArray[newElementRow][newElementCol].value = increasingElement + element;
  // details later, but these below variables should be scoped to a movement function
  tileMoved = true;
  noMoveUp = false;
  noMoveDown = false;
  noMoveLeft = false;
  noMoveRight = false;
}

// probably don't need a util function for this one
function deleteElement(row, col) {
  console.log("deleting element at: ", row, ", ", col);
  boardArray[row][col].value = 0;
}

// How can we test this function?
function newElement() {
  console.log("making new element");
  /*
  shoot me for these but how about
  const { x, y } = getPosition(); // write this function
  const value = getNewValue(); // write this function
  board[y][x] = value;
  ... change class for color, detailed later
  */
  do {
    var newRow = Math.floor(Math.random() * 4);
    var newCol = Math.floor(Math.random() * 4);
    console.log("random row = ", newRow, " random col = ", newCol);
  } while(boardArray[newRow][newCol].value !== 0);
  console.log("newElement row = ", newRow, " newElement col = ", newCol);

  var newElementNum = Math.floor(Math.random() * 10);
  if(newElementNum < 7) {
    newElementNum = 2;
  }
  else {
    newElementNum = 4;
  }
  console.log("newElement number = ", newElementNum);

  boardArray[newRow][newCol].value = newElementNum;

  console.log("calling function to set color of new element");
  changeElementColor(newRow, newCol);
}

function displayBoard() {
  // Hard code this less
  console.log("displaying the board");
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
  console.log("clearing the boardArray to all 0");
  for(var i = 0; i < numRows; i++){
    for(var j = 0; j < numCols; j++){
      boardArray[i][j].value = 0;
      boardArray[i][j].combined = false;
      changeElementColor(i, j);
    }
  }
  console.log("calling function to display board");
  displayBoard();
}

function checkBoard() {
  console.log("checking the board for win or loss");
  for(var i = 0; i < numRows; i++){
    for(var j = 0; j < numCols; j++){
      changeElementColor(i, j);
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
    // these only get set if the user explicitly tries to move in every direction
    // Is there a way to check that prior to user action?
    if(noMoveUp && noMoveDown && noMoveLeft && noMoveRight){
      gameLost = true;
    }
  }
}

function clearCombinedAndTileMoved() {
  for(var i = 0; i < numRows; i++){
    for(var j = 0; j < numCols; j++){
      boardArray[i][j].combined = false;
    }
  }
  tileMoved = false;
}

/*
  Instead of explicit style updates, try changing classes.
  Classes will let you define groups of styles to apply at once
  So - define a class with styles. Whenever appropriate, remove old class and add new one.
*/
function changeElementColor(row, col) {
  console.log("changing element color at: ", row, ", ", col);
  var elementVal = boardArray[row][col].value;
  console.log("element number is ", elementVal);
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
    default:
      break;
  }
}

function newGameButtonPress() {
  console.log("new game button pressed");
  gameLost = false;
  clearBoard();
  newElement();
  newElement();
  displayBoard();
}

/*
  Notes on shifting/merging
  Seriously good job on the in-place and low-complexity solution (if we ignore k)
  Now how do we make it production ready, and make sure it works after the interns touch it?

  Try writing a function that can do this (in this order), and I think the rest will click
  -Shift/merge one row to the right
  -Shift/merge one row to the left
  -Shift/merge one COLUMN up (protip - you shouldn't be passing a row. You're passing a table and a definition of iteration such that you iterate 1d array)
  -Shift/merge one column down
  -Suddenly, you combined 4 functions into 1

  Other random bits:
  -Instead of having a combined flag on each individual tile, can you keep track of the
  tile (let's call it 'head') that will either be merged, or have a square placed next to it?
  i.e. [16,0,2,2,2], action = R
  >read first 2
  >[16,0,2,2,'HEAD(2)']
  >read next 2 + merge
  [16,0,2,'HEAD(0)',4] (tile was merged, head must shift)
  ...
  >[16,0,HEAD(2),4]
  >read 16, push
  >[0,0,HEAD(16),2,4]
*/

function upButtonPress() {
  console.log("Up is pressed");

  // don't need k loop
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
  else {
    noMoveUp = true;
  }
  displayBoard();
  checkBoard();
  clearCombinedAndTileMoved();
}

function downButtonPress() {
  console.log("Down is pressed");

  // don't need k loop
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
  else {
    noMoveDown = true;
  }
  displayBoard();
  checkBoard();
  clearCombinedAndTileMoved();
}

function leftButtonPress() {
  console.log("Left is pressed");

  // don't need k loop
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
  else {
    noMoveLeft = true;
  }
  displayBoard();
  checkBoard();
  clearCombinedAndTileMoved();
}

function rightButtonPress() {
  console.log("Right is pressed");

  // don't need k loop
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
  else {
    noMoveRight = true;
  }
  displayBoard();
  checkBoard();
  clearCombinedAndTileMoved();
}


function currentTestPress() {
  //document.getElementById("currentTest").innerHTML = "No test being performed.";
  let testArray = [
    [4, 0, 4, 1],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ];
  const testNumRow = testArray.length;
  const testNumCol = testArray[0].length;


  console.log(testArray[0]);
  shiftRight();
    console.log(testArray[0]);

  function shiftRight(){
    for(var i = testNumCol - 1; i > 0; i--){
      if(testArray[0][i] === testArray[0][i-1]){
        testArray[0][i] *= 2;
        testArray[0][i-1] = 0;
      }
      else if(testArray[0][i] === 0){
        testArray[0][i] = testArray[0][i-1];
        testArray[0][i-1] = 0;
      }

    }
  }





  /*
  testArray.forEach(function(row, index){
    console.log(row);
    if(index < testArray.length - 1){
      row = row + index;
    }
    console.log(row);
  })
  */
}

//for checking what's in the arrays
function boardButtonPress() {
  console.log("what's in the array:");
  /*
    boardArray.forEach(console.log)
    ==
    boardArray.forEach(function(row){
      console.log(row);
    })
    ==
    for (var i = 0; i < boardArray.length; i++) {
      console.log(boardArray[i]);
    }
  */
  /*
  console.log(boardArray[0][0], boardArray[0][1], boardArray[0][2], boardArray[0][3]);
  console.log(boardArray[1][0], boardArray[1][1], boardArray[1][2], boardArray[1][3]);
  console.log(boardArray[2][0], boardArray[2][1], boardArray[2][2], boardArray[2][3]);
  console.log(boardArray[3][0], boardArray[3][1], boardArray[3][2], boardArray[3][3]);
  */

  boardArray.forEach(function(row){
    row.forEach(function(element){
      console.log(element.value);
    })
  })
}
