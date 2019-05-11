/*
Still to do:
1) bug... if board is full, but still able to make a move, still gameover.
  should be able to make a move first before actual game over.
  ===> half fixed. made flags to check if any movement was done in any direction
    if movement was attempted in all directions but nothing moved, this means game over


*/
let gameLost = false;
let tileMoved = false;
let noMoveUp = false;
let noMoveDown = false;
let noMoveLeft = false;
let noMoveRight = false;

let boardArray = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

const numRows = boardArray.length;
const numCols = boardArray[0].length;

let shiftRow = ({
  isLeft = false,
  arr = [0, 0]
}) => {
  //console.log("shifting row");
  //console.log(arr);
  let rowLen = arr.length;
  let head = isLeft ? 0 : rowLen - 1;
  let end = isLeft ? rowLen : -1;
  let direction = isLeft ? 1 : -1;
  let itr = head + direction;

  for(; (itr * direction) < (end * direction); itr += direction){
    if(arr[itr] !== 0){
      if(arr[itr] === arr[head]){
        arr[head] += arr[itr];
        arr[itr] = 0;
        head += direction;
      }
      else if(arr[head] !== 0 && itr !== head + direction){
        arr[head + direction] = arr[itr];
        arr[itr] = 0;
        head += direction;
      }
      else if(arr[head] !== 0 && itr === head + direction){
        head += direction;
      }
      else if(arr[head] === 0){
        arr[head] = arr[itr];
        arr[itr] = 0;
      }
    }

  }
  return arr;
}

let shiftCol = ({
  isUp = false,
  index = 0,
  arr = [
    [0,0],
    [0,0]
  ]
}) => {
  console.log("shifting col");
  let colLen = arr.length;
  let head = isUp ? 0 : colLen - 1;
  let end = isUp ? colLen : -1;
  let direction = isUp ? 1 : -1;
  let itr = head + direction;

  for(; (itr * direction) < (end * direction); itr += direction){
    if(arr[itr][index] !== 0){
      if(arr[itr][index] === arr[head][index]){
        arr[head][index] += arr[itr][index];
        arr[itr][index] = 0;
        head += direction;
      }
      else if(arr[head][index] !== 0 && itr !== head + direction){
        arr[head + direction][index] = arr[itr][index];
        arr[itr][index] = 0;
        head += direction;
      }
      else if(arr[head][index] !== 0 && itr === head + direction){
        head += direction;
      }
      else{
        arr[head][index] = arr[itr][index];
        arr[itr][index] = 0;
      }
    }

  }
  return arr;
}

document.onkeydown = ({keyCode}) => {
  switch(keyCode){
    case 37:
      console.log("Left");
      for(let i = 0; i < numRows; i++){
        shiftRow({isLeft: true, arr: boardArray[i]});
      }
      break;
    case 38:
      console.log("Up");
      for(let i = 0; i < numCols; i++){
        shiftCol({isUp: true, index: i, arr: boardArray});
      }
      break;
    case 39:
      console.log("Right");
      for(let i = 0; i < numRows; i++){
        shiftRow({isLeft: false, arr: boardArray[i]});
      }
      break;
    case 40:
      console.log("Down");
      for(let i = 0; i < numCols; i++){
        shiftCol({isUp: false, index: i, arr: boardArray});
      }
      break;
    default:
      break;
  }
  newElement();
  displayBoard();
}

// How can we test this function?
function newElement() {
  //console.log("making new element");
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
    //console.log("random row = ", newRow, " random col = ", newCol);
  } while(boardArray[newRow][newCol] !== 0);
  //console.log("newElement row = ", newRow, " newElement col = ", newCol);

  let newElementNum = Math.floor(Math.random() * 10);
  if(newElementNum < 7) {
    newElementNum = 2;
  }
  else {
    newElementNum = 4;
  }
  //console.log("newElement number = ", newElementNum);

  boardArray[newRow][newCol] = newElementNum;

  //console.log("calling function to set color of new element");
  changeElementColor(newRow, newCol);
}

function displayBoard() {
  console.log("displaying the board");
  const board = document.getElementById("gameBoard");
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numRows; j++){
      board.rows[i].cells[j].innerHTML = boardArray[i][j];
      changeElementColor(i, j);
    }
  }
}

function clearBoard() {
  console.log("clearing the boardArray to all 0");
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      boardArray[i][j] = 0;
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
      if(boardArray[i][j] === 2048){
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

function changeElementColor(row, col) {
  //console.log("changing element color at: ", row, ", ", col);
  let elementVal = boardArray[row][col];
  //console.log("element number is ", elementVal);
  switch(elementVal) {
    case 0:
      //console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "zero";
      break;
    case 2:
      //console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "two";
      break;
    case 4:
      //console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "four";
      break;
    case 8:
      //console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "eight";
      break;
    case 16:
      //console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "sixteen";
      break;
    case 32:
      //console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "thirytwo";
      break;
    case 64:
      //console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "sixtyfour";
      break;
    case 128:
      //console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "onetwenyeight";
      break;
    case 256:
      //console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "twofiftysix";
      break;
    case 512:
      //console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "fivetwelve";
      break;
    case 1024:
      //console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "tentwentyfour";
      break;
    case 2048:
      //console.log(document.getElementById("gameBoard").rows[row].cells[col]);
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

function currentTestPress() {
  document.getElementById("currentTest").innerHTML = "No test being performed.";
}

//for checking what's in the arrays
function boardButtonPress() {
  console.log("what's in the array:");
  boardArray.forEach(function(row){
    row.forEach(function(element){
      console.log(element);
    })
  })
}
