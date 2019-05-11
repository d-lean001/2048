///////////////////////////////////////////////////////////////////////////////
// Global Variables
///////////////////////////////////////////////////////////////////////////////

let tileMoved = false;

let boardArray = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

const numRows = boardArray.length;
const numCols = boardArray[0].length;

///////////////////////////////////////////////////////////////////////////////
// Movement functions
///////////////////////////////////////////////////////////////////////////////

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
    newElement({arr: boardArray});
    tileMoved = false;
  }
  displayBoard({arr: boardArray});
  checkBoard({arr: boardArray});
}

///////////////////////////////////////////////////////////////////////////////
// functions to just get onscreen buttons to work
// look into this to see if there's a better way to handle this
///////////////////////////////////////////////////////////////////////////////

function upButtonPress(){
  for(let i = 0; i < numCols; i++){
    shiftCol({isUp: true, index: i, arr: boardArray});
  }
  if(tileMoved === true){
    newElement({arr: boardArray});
    tileMoved = false;
  }
  displayBoard({arr: boardArray});
  checkBoard({arr: boardArray});
}

function leftButtonPress(){
  for(let i = 0; i < numRows; i++){
    shiftRow({isLeft: true, arr: boardArray[i]});
  }
  if(tileMoved === true){
    newElement({arr: boardArray});
    tileMoved = false;
  }
  displayBoard({arr: boardArray});
  checkBoard({arr: boardArray});
}

function rightButtonPress(){
  for(let i = 0; i < numRows; i++){
    shiftRow({isLeft: false, arr: boardArray[i]});
  }
  if(tileMoved === true){
    newElement({arr: boardArray});
    tileMoved = false;
  }
  displayBoard({arr: boardArray});
  checkBoard({arr: boardArray});
}

function downButtonPress(){
  for(let i = 0; i < numCols; i++){
    shiftCol({isUp: false, index: i, arr: boardArray});
  }
  if(tileMoved === true){
    newElement({arr: boardArray});
    tileMoved = false;
  }
  displayBoard({arr: boardArray});
  checkBoard({arr: boardArray});
}

///////////////////////////////////////////////////////////////////////////////
// functions for creating new element
///////////////////////////////////////////////////////////////////////////////

function getPosition({
  arr = [
    [0,0],
    [0,0]
  ]
}){
  const tmpRows = arr.length;
  const tmpCols = arr[0].length;
  let newRow = Math.floor(Math.random() * tmpRows);
  let newCol = Math.floor(Math.random() * tmpCols);
  //console.log("random row = ", newRow, " random col = ", newCol);
  while(arr[newRow][newCol] !== 0){
    newRow = Math.floor(Math.random() * tmpRows);
    newCol = Math.floor(Math.random() * tmpCols);
  }
  //console.log("newElement row = ", newRow, " newElement col = ", newCol);
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

function newElement({
  arr = [
    [0,0],
    [0,0]
  ]
}) {
  //console.log("making new element");
  const {newRow, newCol} = getPosition({arr: arr});
  const value = getNewValue();
  arr[newRow][newCol] = value;
  return arr;
}

///////////////////////////////////////////////////////////////////////////////
// functions to check win and loss
///////////////////////////////////////////////////////////////////////////////

function checkWin({
  arr = [
    [0,0],
    [0,0]
  ]
}){
  //console.log("checking the board for win or loss");
  const tmpRows = arr.length;
  const tmpCols = arr[0].length;
  for(let i = 0; i < tmpRows; i++){
    for(let j = 0; j < tmpCols; j++){
      if(arr[i][j] === 2048){
        window.alert("Congrats! You Win!")
        return;
      }
    }
  }
  return arr;
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
      //console.log("pos:",pos);
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

function checkBoard({
  arr = [
    [0,0],
    [0,0]
  ]
}) {
  //console.log("checking board");
  checkWin({arr: arr});
  if(checkLose({arr: arr})){
    window.alert("Game Over. Click New Game to start over.");
  }
  return arr;
}

///////////////////////////////////////////////////////////////////////////////
// functions to display board and tile colors
//////fix this for pushing game board to single id
//////instead of an already generated HTML table
///////////////////////////////////////////////////////////////////////////////
function displayBoard({
  arr = [
    [0,0],
    [0,0]
  ]
}) {
  //console.log("displaying the board");
  const tmpRows = arr.length;
  const tmpCols = arr[0].length;
  const board = document.getElementById("gameBoard");
  for(let i = 0; i < tmpRows; i++){
    for(let j = 0; j < tmpCols; j++){
      board.rows[i].cells[j].innerHTML = arr[i][j];
      changeElementColor({row: i, col: j, arr: arr});
    }
  }
  return arr;
}

function changeElementColor({
  row = 0,
  col = 0,
  arr = [
    [0,0],
    [0,0]
  ]
}){
  //console.log("changing element color at: ", row, ", ", col);
  const elementVal = arr[row][col];
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

///////////////////////////////////////////////////////////////////////////////
// functions for new game
///////////////////////////////////////////////////////////////////////////////

function clearBoard({
  arr = [
    [0,0],
    [0,0]
  ]
}) {
  //console.log("clearing the boardArray to all 0");
  const tmpRows = arr.length;
  const tmpCols = arr[0].length;
  for(let i = 0; i < tmpRows; i++){
    for(let j = 0; j < tmpCols; j++){
      arr[i][j] = 0;
    }
  }
  //console.log("calling function to display board");
  displayBoard({arr: boardArray});
  return arr;
}

function newGameButtonPress() {
  console.log("new game button pressed");
  clearBoard({arr: boardArray});
  newElement({arr: boardArray});
  newElement({arr: boardArray});
  displayBoard({arr: boardArray});
}


///////////////////////////////////////////////////////////////////////////////
//////// the following used for trying new things and testing it //////////////
///////////////////////////////////////////////////////////////////////////////

function currentTestPress() {
  //document.getElementById("currentTest").innerHTML = "No test being performed.";

  //var testTable = document.createElement("myTestTable");
  const testTable = document.getElementById("testDiv");
  //let testFirstRow = testTable.insertRow(0);
  //let testCell0 = testFirstRow.insertCell(0);
  //let testCell1 = testFirstRow.insertCell(1);
  //testCell0.innerHTML = "Hello World";
  //testCell1.innerHTML = "Goodbye";

  if(testTable.rows.length !== 0 && testTable.rows[0].cells.length !== 0){
    console.log("not an empty table");
  }
  else{
    console.log("creating rows/cols in the table");
    for(let i = 0; i < 4; i++){
      let testRow = testTable.insertRow(i);
      for(let j = 0; j < 7; j++){
        let testCell = testRow.insertCell(j);
        testCell.textContent = i+j;
      }
    }
    console.log("textContent:", testTable.rows[3].cells[3].textContent);
    console.log("row length:", testTable.rows.length);
    console.log("cell length:", testTable.rows[0].cells.length)
  }
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
