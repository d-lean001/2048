//Rows
var rowOne = [
  Number(document.getElementById("uull").innerHTML),
  Number(document.getElementById("uul").innerHTML),
  Number(document.getElementById("uur").innerHTML),
  Number(document.getElementById("uurr").innerHTML)
]

var rowTwo = [
  Number(document.getElementById("ull").innerHTML),
  Number(document.getElementById("ul").innerHTML),
  Number(document.getElementById("ur").innerHTML),
  Number(document.getElementById("urr").innerHTML)
]

var rowThree = [
  Number(document.getElementById("dll").innerHTML),
  Number(document.getElementById("dl").innerHTML),
  Number(document.getElementById("dr").innerHTML),
  Number(document.getElementById("drr").innerHTML)
]

var rowFour = [
  Number(document.getElementById("ddll").innerHTML),
  Number(document.getElementById("ddl").innerHTML),
  Number(document.getElementById("ddr").innerHTML),
  Number(document.getElementById("ddrr").innerHTML)
]

//Columns
var colOne = [
  Number(document.getElementById("uull").innerHTML),
  Number(document.getElementById("ull").innerHTML),
  Number(document.getElementById("dll").innerHTML),
  Number(document.getElementById("ddll").innerHTML)
]

var colTwo = [
  Number(document.getElementById("uul").innerHTML),
  Number(document.getElementById("ul").innerHTML),
  Number(document.getElementById("dl").innerHTML),
  Number(document.getElementById("ddl").innerHTML)
]

var colThree = [
  Number(document.getElementById("uur").innerHTML),
  Number(document.getElementById("ur").innerHTML),
  Number(document.getElementById("dr").innerHTML),
  Number(document.getElementById("ddr").innerHTML)
]

var colFour = [
  Number(document.getElementById("uurr").innerHTML),
  Number(document.getElementById("urr").innerHTML),
  Number(document.getElementById("drr").innerHTML),
  Number(document.getElementById("ddrr").innerHTML)
]

//handles button presses
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

function moveElement(increasingElement, element, array, increasingElementPosition, elementPosition) {
  array[increasingElementPosition] = increasingElement + element;
  return;
}

function currentTestPress() {
  console.log("Testing = moving rowOne[1] into rowOne[0]");
  console.log("Before = ", rowOne[0], rowOne[1]);
  moveElement(rowOne[0], rowOne[1], rowOne, 0,1);
  console.log("After = ", rowOne[0], rowOne[1]);
}

//for checking what's in the arrays
function boardButtonPress() {
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
}
