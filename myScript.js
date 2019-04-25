//Rows
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

/*
var rowOne = [
  Number(document.getElementById("uull").innerHTML),
  Number(document.getElementById("uul").innerHTML),
  Number(document.getElementById("uur").innerHTML),
  Number(document.getElementById("uurr").innerHTML)
];

var rowTwo = [
  Number(document.getElementById("ull").innerHTML),
  Number(document.getElementById("ul").innerHTML),
  Number(document.getElementById("ur").innerHTML),
  Number(document.getElementById("urr").innerHTML)
];

var rowThree = [
  Number(document.getElementById("dll").innerHTML),
  Number(document.getElementById("dl").innerHTML),
  Number(document.getElementById("dr").innerHTML),
  Number(document.getElementById("drr").innerHTML)
];

var rowFour = [
  Number(document.getElementById("ddll").innerHTML),
  Number(document.getElementById("ddl").innerHTML),
  Number(document.getElementById("ddr").innerHTML),
  Number(document.getElementById("ddrr").innerHTML)
];

//Columns
var colOne = [
  Number(document.getElementById("uull").innerHTML),
  Number(document.getElementById("ull").innerHTML),
  Number(document.getElementById("dll").innerHTML),
  Number(document.getElementById("ddll").innerHTML)
];

var colTwo = [
  Number(document.getElementById("uul").innerHTML),
  Number(document.getElementById("ul").innerHTML),
  Number(document.getElementById("dl").innerHTML),
  Number(document.getElementById("ddl").innerHTML)
];

var colThree = [
  Number(document.getElementById("uur").innerHTML),
  Number(document.getElementById("ur").innerHTML),
  Number(document.getElementById("dr").innerHTML),
  Number(document.getElementById("ddr").innerHTML)
];

var colFour = [
  Number(document.getElementById("uurr").innerHTML),
  Number(document.getElementById("urr").innerHTML),
  Number(document.getElementById("drr").innerHTML),
  Number(document.getElementById("ddrr").innerHTML)
];
*/

function upButtonPress() {
  console.log("Up is pressed");
  document.getElementById("debugText").innerHTML = "Up is pressed";
}

function downButtonPress() {
  console.log("Down is pressed");
  document.getElementById("debugText").innerHTML = "Down is pressed";
}

function leftButtonPress() {
  console.log("Left is pressed");
  document.getElementById("debugText").innerHTML = "Left is pressed";
}

function rightButtonPress() {
  console.log("Right is pressed");
  document.getElementById("debugText").innerHTML = "Right is pressed";
}

function moveElement(increasingElement, element, array, newElementRow, newElementCol) {
  array[newElementRow][newElementCol] = increasingElement + element;
  return;
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
  /*
  document.getElementById("uull").innerHTML = rowOne[0];
  document.getElementById("uul").innerHTML = rowOne[1];
  document.getElementById("uur").innerHTML = rowOne[2];
  document.getElementById("uurr").innerHTML = rowOne[3];

  document.getElementById("ull").innerHTML = rowTwo[0];
  document.getElementById("ul").innerHTML = rowTwo[1];
  document.getElementById("ur").innerHTML = rowTwo[2];
  document.getElementById("urr").innerHTML = rowTwo[3];

  document.getElementById("dll").innerHTML = rowThree[0];
  document.getElementById("dl").innerHTML = rowThree[1];
  document.getElementById("dr").innerHTML = rowThree[2];
  document.getElementById("drr").innerHTML = rowThree[3];

  document.getElementById("ddll").innerHTML = rowFour[0];
  document.getElementById("ddl").innerHTML = rowFour[1];
  document.getElementById("ddr").innerHTML = rowFour[2];
  document.getElementById("ddrr").innerHTML = rowFour[3];
  */
}

//current test in progress
function currentTestPress() {
  /*console.log("Testing = moving rowOne[1] into rowOne[0]. Then changing the board on the screen");
  console.log("Before = ", rowOne[0], rowOne[1]);
  moveElement(rowOne[0], rowOne[1], rowOne, 0,1);
  console.log("After = ", rowOne[0], rowOne[1]);
  displayBoard();*/

  var arr2D = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ];
  console.log(arr2D[3][2]);

  moveElement(boardArray[0][0], boardArray[0][1], boardArray, 0, 0);
  displayBoard();
}

//for checking what's in the arrays
function boardButtonPress() {
  document.getElementById("debugText").innerHTML = "Look at console to see what's on the boardArray";
  console.log(boardArray[0][0], boardArray[0][1], boardArray[0][2], boardArray[0][3]);
  console.log(boardArray[1][0], boardArray[1][1], boardArray[1][2], boardArray[1][3]);
  console.log(boardArray[2][0], boardArray[2][1], boardArray[2][2], boardArray[2][3]);
  console.log(boardArray[3][0], boardArray[3][1], boardArray[3][2], boardArray[3][3]);

  /*
  document.getElementById("debugText").innerHTML = "look at console log to see row and column array values";
  console.log("-------Rows Array------");
  console.log(rowOne[0], rowOne[1], rowOne[2], rowOne[3]);
  console.log(rowTwo[0], rowTwo[1], rowTwo[2], rowTwo[3]);
  console.log(rowThree[0], rowThree[1], rowThree[2], rowThree[3]);
  console.log(rowFour[0], rowFour[1], rowFour[2], rowFour[3]);

  console.log("-------Columns Array------");
  console.log(colOne[0], colTwo[0], colThree[0], colFour[0]);
  console.log(colOne[1], colTwo[1], colThree[1], colFour[1]);
  console.log(colOne[2], colTwo[2], colThree[2], colFour[2]);
  console.log(colOne[3], colTwo[3], colThree[3], colFour[3]);
  */
}
