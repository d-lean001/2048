//Rows
var rowOne = [
  document.getElementById("uull").innerHTML,
  document.getElementById("uul").innerHTML,
  document.getElementById("uur").innerHTML,
  document.getElementById("uurr").innerHTML
]

var rowTwo = [
  document.getElementById("ull").innerHTML,
  document.getElementById("ul").innerHTML,
  document.getElementById("ur").innerHTML,
  document.getElementById("urr").innerHTML
]

var rowThree = [
  document.getElementById("dll").innerHTML,
  document.getElementById("dl").innerHTML,
  document.getElementById("dr").innerHTML,
  document.getElementById("drr").innerHTML
]

var rowFour = [
  document.getElementById("ddll").innerHTML,
  document.getElementById("ddl").innerHTML,
  document.getElementById("ddr").innerHTML,
  document.getElementById("ddrr").innerHTML
]

//Columns
var colOne = [
  document.getElementById("uull").innerHTML,
  document.getElementById("ull").innerHTML,
  document.getElementById("dll").innerHTML,
  document.getElementById("ddll").innerHTML
]

var colTwo = [
  document.getElementById("uul").innerHTML,
  document.getElementById("ul").innerHTML,
  document.getElementById("dl").innerHTML,
  document.getElementById("ddl").innerHTML
]

var colThree = [
  document.getElementById("uur").innerHTML,
  document.getElementById("ur").innerHTML,
  document.getElementById("dr").innerHTML,
  document.getElementById("ddr").innerHTML
]

var colFour = [
  document.getElementById("uurr").innerHTML,
  document.getElementById("urr").innerHTML,
  document.getElementById("drr").innerHTML,
  document.getElementById("ddrr").innerHTML
]

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

function boardButtonPress() {
  document.getElementById("debugText").innerHTML = "look at console log to see row and column array values";
  console.log("-------Rows Array------");
  console.log(rowOne[0], rowOne[1], rowOne[2], rowOne[3]);
  console.log(rowTwo[0], rowTwo[1], rowTwo[2], rowTwo[3]);
  console.log(rowThree[0], rowThree[1], rowThree[2], rowThree[3]);
  console.log(rowFour[0], rowFour[1], rowFour[2], rowFour[3]);

  console.log("-------Columns Array------");
  console.log(colOne[0], colOne[1], colOne[2], colOne[3]);
  console.log(colTwo[0], colTwo[1], colTwo[2], colTwo[3]);
  console.log(colThree[0], colThree[1], colThree[2], colThree[3]);
  console.log(colFour[0], colFour[1], colFour[2], colFour[3]);
}
