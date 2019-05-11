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
let boardArray = [
  [
    {value:0, combined:false},
    {value:0, combined:false},
    {value:0, combined:false},
    {value:0, combined:false}
  ],
  [
    {value:0, combined:false},
    {value:0, combined:false},
    {value:0, combined:false},
    {value:0, combined:false}
  ],
  [
    {value:0, combined:false},
    {value:0, combined:false},
    {value:0, combined:false},
    {value:0, combined:false}
  ],
  [
    {value:0, combined:false},
    {value:0, combined:false},
    {value:0, combined:false},
    {value:0, combined:false}
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

/*const {
  nested: {
    key = 'default'
  } = {},
  date_modified
} = await getResponse();
shiftRow2({
  row: []


  if(isUp === true)
    console.log("up is true");
  else if(isUp === false)
    console.log("up is false");
  else if(isUp === undefined)
    console.log("up is undefined?");
})*/

let shiftRow = ({
  isLeft = false,
  arr = [0, 0]
}) => {
  let rowLen = arr.length;
  let head = isLeft ? 0 : rowLen - 1;
  let end = isLeft ? rowLen : -1;
  let direction = isLeft ? 1 : -1;
  let index = head + direction;

  for(; (index * direction) < (end * direction); index += direction){
    if(arr[index] !== 0){
      if(arr[index] === arr[head]){
        arr[head] += arr[index];
        arr[index] = 0;
        head += direction;
      }
      else if(arr[head] !== 0){
        arr[head + direction] = arr[index];
        arr[index] = 0;
        head += direction;
      }
      else{
        arr[head] = arr[index];
        arr[index] = 0;
      }
    }

  }
  return arr;
}

let shiftCol = ({
  isUp = false,
  arr = [
    [0,0],
    [0,0]
  ]
}) => {
  let colLen = arr.length;
  let head = isUp ? 0 : colLen - 1;
  let end = isUp ? colLen : -1;
  let direction = isUp ? 1 : -1;
  let index = head + direction;

  for(; (index * direction) < (end * direction); index += direction){
    if(arr[index][0] !== 0){
      if(arr[index][0] === arr[head][0]){
        arr[head][0] += arr[index][0];
        arr[index][0] = 0;
        head += direction;
      }
      else if(arr[head][0] !== 0){
        arr[head + direction][0] = arr[index][0];
        arr[index][0] = 0;
        head += direction;
      }
      else{
        arr[head][0] = arr[index][0];
        arr[index][0] = 0;
      }
    }

  }
  return arr;
}

/*
let shiftRow = ({
  isLeft,
  isUp,
  index,
  array = [[0,0], [0,0]]
}) => {
  let rowLen = array[0].length;
  let colLen = array.length;

  let headLeft;
  let endLeft;
  let directionLeft;
  let itrLeft;

  let headUp;
  let endUp;
  let directionUp;
  let itrUp;


  if(isLeft === undefined){
    headLeft = index;
  }
  else if(!left){
    headLeft = rowLen - 1;
    endLeft = 0;
    direction = -1;
    itrLeft = headLeft + directionLeft;
  }
  else{
    headLeft = 0;
    endLeft = rowLen;
    direction = 1;
    itrLeft = headLeft + directionLeft;
  }

  if(isUp === undefined){
    headUp = index;
  }
  else if(!isUp){
    headUp = colLen - 1;
    endUp = 0;
    direction = -1;
    itrUp = headUp + directionUp;
  }
  else{
    headUp = 0;
    endUp = colLen;
    direction = 1;
    itrUp = headUp + directionUp;
  }

  //let head = isLeft ? 0 : rowLen - 1;
  //let end = isLeft ? rowLen : 0;
  //let direction = isLeft ? 1 : -1;
  //let itr = head + direction;

  for(; (itr * direction) < (end * direction); itr += direction){
    if(array[itrUp][itrLeft] !== 0){
      if(array[0][head] === array[0][itr]){
        array[0][head] += array[0][itr];
        array[0][itr] = 0;
        head += direction;
      }
      else if(array[0][head] !== 0){
        array[0][head + direction] = array[0][itr];
        array[0][itr] = 0;
        head += direction;
      }
      else{
        array[0][head] = array[0][itr];
        array[0][itr] = 0;
      }
    }
  }
  return array;
}
*/

document.onkeydown = ({keyCode}) => {
  switch(keyCode){
    case 37:
      console.log("Left");
      //for(let k = 0; k < numCols; k++){
        for(let i = 0; i < numCols; i++){
          move(-1, 0, i);
        }
      //}

      break;
    case 38:
      console.log("Up");
      //for(let k = 0; k < numCols; k++){
        for(let i = 0; i < numCols; i++){
          move(1, -1, i);
        }
      //}
      break;
    case 39:
      console.log("Right");
      //for(let k = 0; k < numCols; k++){
        for(let i = 0; i < numCols; i++){
          move(-1, 1, i);
        }
      //}
      break;
    case 40:
      console.log("Down");
      //for(let k = 0; k < numCols; k++){
        for(let i = 0; i < numCols; i++){
          move(0, -1, i);
        }
      //}
      break;
    default:
      break;
  }
  newElement();
  displayBoard();
}

function move(isUp, isRight, index){
  /*let startRight = isRight ? 0 : numCols-1;
    let endRight = isRight ? numCols-1 : 0;
    let directionRight = isRight ? 1 : -1;
    let headRight = startRight;

    while((directionRight * headRight) < (directionRight * endRight)){
      if((directionRight * startRight) < (directionRight * endRight)){
        if(boardArray[index][startRight].value === boardArray[index][startRight + directionRight].value){
          boardArray[index][startRight + directionRight].value *= 2;
          boardArray[index][startRight].value = 0;
        }
        else if(boardArray[index][startRight + directionRight].value === 0){
          boardArray[index][startRight + directionRight].value = boardArray[index][startRight].value;
          boardArray[index][startRight].value = 0;
        }
        startRight += directionRight;
      }
      else{
        headRight += directionRight;
        startRight = headRight;
      }

    let startUp = isUp ? numRows-1 : 0;
    let endUp = isUp ? 0 : numRows-1;
    let directionUp = isUp ? -1 : 1;
    let tmpUp = startUp;

    while((directionUp * tmpUp) < (directionUp * endUp)){
      if((directionUp * startUp) < (directionUp * endUp)){
        if(boardArray[startUp + directionUp][index].value === boardArray[startUp][index].value){
          boardArray[startUp + directionUp][index].value *= 2;
          boardArray[startUp][index].value = 0;
        }
        else if(boardArray[startUp + directionUp][index].value === 0){
          boardArray[startUp + directionUp][index].value = boardArray[startUp][index].value;
          boardArray[startUp][index].value = 0;
        }
        startUp += directionUp;
      }
      else{
        tmpUp += directionUp;
        startUp = tmpUp;
      }
    }*/

  if(isUp === -1){
    /*let startRight = isRight ? numCols-1 : 0;
    let endRight = isRight ? 0 : numCols-1;
    let directionRight = isRight ? -1 : 1;

    for(; (directionRight * startRight) < (directionRight * endRight); startRight += directionRight){
      if(boardArray[index][startRight].value === boardArray[index][startRight + directionRight].value){
        boardArray[index][startRight].value *= 2;
        boardArray[index][startRight + directionRight].value = 0;
      }
      else if(boardArray[index][startRight].value === 0){
        boardArray[index][startRight].value = boardArray[index][startRight + directionRight].value;
        boardArray[index][startRight + directionRight].value = 0;
      }
    }*/
    let startRight = isRight ? numCols-1 : 0;
    let endRight = isRight ? 0 : numCols-1;
    let directionRight = isRight ? -1 : 1;
    let headRight = startRight;
    let movedRight = false;

    while((directionRight * headRight) < (directionRight * endRight)){
      if((directionRight * startRight) < (directionRight * endRight)){
        if(boardArray[index][startRight].value === 0 && boardArray[index][startRight + directionRight].value !== 0){
          boardArray[index][startRight].value = boardArray[index][startRight + directionRight].value;
          boardArray[index][startRight + directionRight].value = 0;
          startRight += directionRight;
          movedRight = true;
        }
        else{
          startRight += directionRight;
        }

        if(boardArray[index][headRight].value === boardArray[index][headRight + directionRight].value && (boardArray[index][headRight].value !== 0)){
          boardArray[index][headRight].value *= 2;
          boardArray[index][headRight + directionRight].value = 0;
          headRight += directionRight;
        }
        else if((boardArray[index][headRight].value !== boardArray[index][headRight + directionRight].value) && (boardArray[index][headRight].value !== 0) && (boardArray[index][headRight + directionRight].value !== 0)){
          //&& (boardArray[index][headRight + directionRight].value !== 0
          headRight += directionRight;
        }
      }
      else{
        if(movedRight === false){
          break;
        }
        else{
          startRight = headRight;
          movedRight = false;
        }
      }
    }
  }
  else{
    let startUp = isUp ? 0 : numRows-1;
    let endUp = isUp ? numRows-1 : 0;
    let directionUp = isUp ? 1 : -1;

    for(; (directionUp * startUp) < (directionUp * endUp); startUp += directionUp){
      if(boardArray[startUp][index].value === boardArray[startUp + directionUp][index].value){
        boardArray[startUp][index].value *= 2;
        boardArray[startUp + directionUp][index].value = 0;
      }
      else if(boardArray[startUp][index].value === 0){
        boardArray[startUp][index].value = boardArray[startUp + directionUp][index].value;
        boardArray[startUp + directionUp][index].value = 0;
      }
    }
  }
}

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
/*
document.onkeydown = function(key) {
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
*/

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

/*
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
}*/
/*
// probably don't need a util function for this one
function deleteElement(row, col) {
  console.log("deleting element at: ", row, ", ", col);
  boardArray[row][col].value = 0;
}*/

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

  let newElementNum = Math.floor(Math.random() * 10);
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
  const board = document.getElementById("gameBoard");
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numRows; j++){
      board.rows[i].cells[j].innerHTML = boardArray[i][j].value;
      changeElementColor(i, j);
    }
  }
  /*
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
  */
}

function clearBoard() {
  console.log("clearing the boardArray to all 0");
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
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
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
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
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
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
  let elementVal = boardArray[row][col].value;
  console.log("element number is ", elementVal);
  switch(elementVal) {
    case 0:
      //document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "white";
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "zero";
      break;
    case 2:
      //document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#ffff99";
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "two";
      break;
    case 4:
      console.log(document.getElementById("gameBoard").rows[row].cells[col].classList);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "four";
      break;
    case 8:
      //document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#ffff00";
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "eight";
      break;
    case 16:
      //document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#ccffcc";
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "sixteen";
      break;
    case 32:
      //document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#99ff99";
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "thirytwo";
      break;
    case 64:
      //document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#66ff66";
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "sixtyfour";
      break;
    case 128:
      //document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#ccffff";
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "onetwenyeight";
      break;
    case 256:
      //document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#66ffff";
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "twofiftysix";
      break;
    case 512:
      //document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#00ffff";
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "fivetwelve";
      break;
    case 1024:
      //document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "#ff9966";
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "tentwentyfour";
      break;
    case 2048:
      //document.getElementById(boardArray[row][col].elementId).style.backgroundColor = "red";
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "twentyfortyeight";
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



/*
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

*/


function currentTestPress() {
  //document.getElementById("currentTest").innerHTML = "No test being performed.";
  let testArray = [
    [4, 4, 4, 4],
    [5, 6, 7, 8],
    [5, 10, 11, 12],
    [13, 14, 15, 16]
  ];
  const testNumRow = testArray.length;
  const testNumCol = testArray[0].length;


  //console.log(testArray);
  //move(key);

  console.log("testing displaying using table id");
  document.getElementById("gameBoard").rows[0].cells[1].innerHTML = 12;





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
