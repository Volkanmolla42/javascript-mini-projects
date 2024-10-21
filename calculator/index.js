const lpar = "(";
const rpar = ")";

const display = document.getElementById("display");

function appendToDisplay(entity) {
  if (display.value === "Error") {
    display.value = "";
  }
  display.value += entity;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}
