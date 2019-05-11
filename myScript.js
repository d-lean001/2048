/*
Still to do:
1) bug... if board is full, but still able to make a move, still gameover.
  should be able to make a move first before actual game over.
  ===> half fixed. made flags to check if any movement was done in any direction
    if movement was attempted in all directions but nothing moved, this means game over


*/
let gameLost = false;
let tileMoved = false;

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
        tileMoved = true;
      }
      else if(arr[head] !== 0 && itr !== head + direction){
        arr[head + direction] = arr[itr];
        arr[itr] = 0;
        head += direction;
        tileMoved = true;
      }
      else if(arr[head] !== 0 && itr === head + direction){
        head += direction;
      }
      else if(arr[head] === 0){
        arr[head] = arr[itr];
        arr[itr] = 0;
        tileMoved = true;
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
  //console.log("shifting col");
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
        tileMoved = true;
      }
      else if(arr[head][index] !== 0 && itr !== head + direction){
        arr[head + direction][index] = arr[itr][index];
        arr[itr][index] = 0;
        head += direction;
        tileMoved = true;
      }
      else if(arr[head][index] !== 0 && itr === head + direction){
        head += direction;
      }
      else{
        arr[head][index] = arr[itr][index];
        arr[itr][index] = 0;
        tileMoved = true;
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

  if(tileMoved === true){
    newElement();
    tileMoved = false;
  }
  displayBoard();
  checkBoard();
}

function getPosition(){
  let newRow = Math.floor(Math.random() * 4);
  let newCol = Math.floor(Math.random() * 4);
  console.log("random row = ", newRow, " random col = ", newCol);
  while(boardArray[newRow][newCol] !== 0){
    newRow = Math.floor(Math.random() * 4);
    newCol = Math.floor(Math.random() * 4);
  }
  console.log("newElement row = ", newRow, " newElement col = ", newCol);
  return {newRow, newCol};
}

function getNewValue(){
  const newElementNum = Math.floor(Math.random() * 10);
  if(newElementNum < 7) {
    return 2;
  }
  else {
    return 4;
  }
  //console.log("newElement number = ", newElementNum);
}

function newElement() {
  //console.log("making new element");
  const {newRow, newCol} = getPosition();
  const value = getNewValue();
  boardArray[newRow][newCol] = value;
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

function checkWin({
  arr = boardArray
}){
  //console.log("checking the board for win or loss");
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      if(arr[i][j] === 2048){
        window.alert("Congrats! You Win!")
        return;
      }
    }
  }
}

function checkLose({
  arr = [
    [0,0],
    [0,0]
  ]
}){
  let tmpRow = arr.length;
  let tmpCol = arr[0].length;

  for(let i = 0; i < tmpRow; i++){
    for(let j = 0; j < tmpCol; j++){
      let pos = arr[i][j];
      console.log("pos:",pos);
      if(pos === 0){
        return false;
      }

      if(i === 0){
        //check only bottom
        if(pos !== 0 && pos === arr[i+1][j]){
          return false;
        }
      }
      else if(i === tmpRow - 1){
        //check only top
        if(pos !== 0 && pos === arr[i-1][j]){
          return false;
        }
      }
      else{
        //check both bottom and top
        if(pos !== 0 && (pos === arr[i-1][j] || pos === arr[i+1][j])){
          return false;
        }
      }

      if(j === 0){
        //check only right
        if(pos !== 0 && pos === arr[i][j+1]){
          return false;
        }
      }
      else if(j === tmpCol - 1){
        //check only left
        if(pos !== 0 && pos === arr[i][j-1]){
          return false;
        }
      }
      else{
        //check both left and right
        if(pos !== 0 && (pos === arr[i][j-1] || pos === arr[i][j+1])){
          return false;
        }
      }
    }
  }
  return true;
}

function checkBoard() {
  console.log("checking board");
  checkWin({arr: boardArray});
  if(checkLose({arr: boardArray})){
    window.alert("Game Over. Click New Game to start over.");
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
