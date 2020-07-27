// function validate(evt) {
//   var theEvent = evt || window.event;

//   // Handle paste
//   if (theEvent.type === 'paste') {
//       key = event.clipboardData.getData('text/plain');
//   } else {
//   // Handle key press
//       var key = theEvent.keyCode || theEvent.which;
//       key = String.fromCharCode(key);
//   }
//   var regex = /[0-9]|\./;
//   if( !regex.test(key) ) {
//     theEvent.returnValue = false;
//     if(theEvent.preventDefault) theEvent.preventDefault();
//   }
// }

let runningTotal = 0;
let buffer = "0";
let previousOperator;
let screen = document.querySelector('.screen');

document.querySelector('.numbers').addEventListener('click', function(event){
  buttonClick(event.target.innerText);
});
document.querySelector('.operators--clear').addEventListener('click', function(event){
  buttonClick(event.target.innerText);
});
document.querySelector('.operators').addEventListener('click', function(event){
  buttonClick(event.target.innerText);
});

const rerender = () => {
  screen.innerText = buffer;
}

function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = "0";
}

function flushOperation(intBuffer) {
  if(previousOperator === "+") {
    runningTotal += intBuffer;
  }else if(previousOperator === "-"){
    runningTotal -= intBuffer;
  }else if(previousOperator === "×"){
    runningTotal *= intBuffer;
  }else{
    runningTotal /= intBuffer;
  }
}
const handleNumber = value => {
  if (buffer === '0'){
    buffer = value;
  }else{
    buffer += value;
  }
}
const handleSymbol = value => {
  switch (value) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      previousOperator = null;
      break;
    case '=':
      if(previousOperator === null){
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = " " + runningTotal;
      runningTotal = 0;
      break;
    case "⇐":
      if(buffer.length === 1){
        buffer = "0";
      }else{
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleMath(value);
      break;
  }
}
const buttonClick = value => {
  if (isNaN(parseInt(value))) {
    handleSymbol(value)
    console.log(value);
  }else{
    handleNumber(value)
    console.log(value);
  }
  rerender();
}

let yellow = "theme--yellow";
let teal = "theme--teal";
let lime = "theme--lime";
let red = "theme--red";
let light = "theme--light";
let blue = "theme--blue";
let dark = "theme--dark";
let primaryColor = document.querySelectorAll(".button--number");
let secondaryColor2 = document.querySelectorAll(".button--operator");
let secondaryColor = document.querySelectorAll(".operators");
let equalSignColor = document.querySelector(".button--equal-sign");
let calculator = document.querySelector(".calculator");

const colorChanger = (primary, secondary, equalSign) => {
  for (let i = 0; i < secondaryColor2.length; i++) {
    secondaryColor2[i].style.backgroundColor = secondary;
  }
  for (let i = 0; i < primaryColor.length; i++) {
    primaryColor[i].style.backgroundColor = primary;
  }
  for (let i = 0; i < secondaryColor.length; i++) {
    secondaryColor[i].style.backgroundColor = secondary;
  }
  equalSignColor.style.backgroundColor = equalSign;
  calculator.style.backgroundColor = primary;
}

document.querySelector(".theme-wrapper").addEventListener('click', function(event){
  const classColor = event.target.className.split(' ')[1]
  if (classColor === yellow) {
    colorChanger("#E1BE2E", "#b39317" , "#0B4385")
  }else if(classColor === teal){
    colorChanger("#17977A", "#0e725b" , "#EB0028")
  }else if(classColor === lime){
    colorChanger("#A7D775", "#7bbd35" , "#b39317")
  }else if(classColor === red){
    colorChanger("#A73D3D", "#A13336" , "#242424")
  }else if(classColor === light){
    colorChanger("#E3E3E3", "#CAC8C8" , "#0B4385")
  }else if(classColor === blue){
    colorChanger("#4286D6", "#0B4385" , "#A13336")
  }else if(classColor === dark){
    colorChanger("#3D3D3D", "#242424" , "#0B4385")
  }else{
    console.log('Not');
  }
})