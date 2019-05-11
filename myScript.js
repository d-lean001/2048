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

document.onkeydown = ({keyCode}) => {
  switch(keyCode){
    case 37:
      console.log("Left");
      for(let i = 0; i < numCols; i++){
        move(-1, 0, i);
      }
      break;
    case 38:
      console.log("Up");
      for(let i = 0; i < numCols; i++){
        move(1, -1, i);
      }
      break;
    case 39:
      console.log("Right");
      for(let i = 0; i < numCols; i++){
        move(-1, 1, i);
      }
      break;
    case 40:
      console.log("Down");
      for(let i = 0; i < numCols; i++){
        move(0, -1, i);
      }
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
  console.log("displaying the board");
  const board = document.getElementById("gameBoard");
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numRows; j++){
      board.rows[i].cells[j].innerHTML = boardArray[i][j].value;
      changeElementColor(i, j);
    }
  }
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

function changeElementColor(row, col) {
  console.log("changing element color at: ", row, ", ", col);
  let elementVal = boardArray[row][col].value;
  console.log("element number is ", elementVal);
  switch(elementVal) {
    case 0:
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "zero";
      break;
    case 2:
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "two";
      break;
    case 4:
      console.log(document.getElementById("gameBoard").rows[row].cells[col].classList);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "four";
      break;
    case 8:
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "eight";
      break;
    case 16:
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "sixteen";
      break;
    case 32:
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "thirytwo";
      break;
    case 64:
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "sixtyfour";
      break;
    case 128:
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "onetwenyeight";
      break;
    case 256:
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "twofiftysix";
      break;
    case 512:
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "fivetwelve";
      break;
    case 1024:
      console.log(document.getElementById("gameBoard").rows[row].cells[col]);
      document.getElementById("gameBoard").rows[row].cells[col].classList = "tentwentyfour";
      break;
    case 2048:
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

function currentTestPress() {
  document.getElementById("currentTest").innerHTML = "No test being performed.";
}

//for checking what's in the arrays
function boardButtonPress() {
  console.log("what's in the array:");
  boardArray.forEach(function(row){
    row.forEach(function(element){
      console.log(element.value);
    })
  })
}
