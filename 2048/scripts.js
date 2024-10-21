document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.querySelector("#score");
  const resultDisplay = document.querySelector("#result");
  let squares = [];
  const width = 4;
  let score = 0;

  function createBoard() {
    // Create board
    for (let i = 0; i < width * width; i++) {
      let square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
  }

  function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      checkForGameOver();
    } else {
      generate();
    }
  }

  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
        let filterRow = row.filter((num) => num);
        let missing = 4 - filterRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filterRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
    combineRow();
  }

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredColumn);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
    combineColumn();
  }

  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filterRow = row.filter((num) => num);
        let missing = 4 - filterRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filterRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
    combineRow();
  }
  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = filteredColumn.concat(zeros);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
    combineColumn();
  }

  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + width].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  function controls(e) {
    if (e.keyCode === 37) keyLeft();
    else if (e.keyCode === 38) keyUp();
    else if (e.keyCode === 39) keyRight();
    else if (e.keyCode === 40) keyDown();
  }

  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = "You Won";
        document.removeEventListener("keyup", controls);
        setTimeout(() => clear(), 3000);
      }
    }
  }

  document.addEventListener("keyup", controls);

  function keyRight() {
    moveRight();
    moveRight();
    generate();
  }

  function keyLeft() {
    moveLeft();
    moveLeft();
    generate();
  }

  function keyUp() {
    moveUp();
    moveUp();
    generate();
  }

  function keyDown() {
    moveDown();
    moveDown();
    generate();
  }

  function checkForGameOver() {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      squares[i].style.color = "white";
      if (squares[i].innerHTML == 0) {
        zeros++;
        squares[i].style.color = "#afa192";
      }

      if (squares[i].innerHTML == 2 || squares[i].innerHTML == 4) {
        squares[i].style.color = "#afa192";
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = "Game Over";
      document.removeEventListener("keyup", controls);
      setTimeout(() => clearInterval(myTimer), 3000);
    }
  }

  function clear() {
    clearInterval(myTimer);
  }

  function addColors() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0)
        squares[i].style.backgroundColor = "#afa192";
      // Light brown
      else if (squares[i].innerHTML == 2)
        squares[i].style.backgroundColor = "#eee4da";
      // Light beige
      else if (squares[i].innerHTML == 4)
        squares[i].style.backgroundColor = "#ede0c8";
      // Beige
      else if (squares[i].innerHTML == 8)
        squares[i].style.backgroundColor = "#f2b179";
      // Light orange
      else if (squares[i].innerHTML == 16)
        squares[i].style.backgroundColor = "#f59563";
      // Orange
      else if (squares[i].innerHTML == 32)
        squares[i].style.backgroundColor = "#f67c5f";
      // Dark orange
      else if (squares[i].innerHTML == 64)
        squares[i].style.backgroundColor = "#f65e3b";
      // Reddish orange
      else if (squares[i].innerHTML == 128)
        squares[i].style.backgroundColor = "#edcf72";
      // Light yellow
      else if (squares[i].innerHTML == 256)
        squares[i].style.backgroundColor = "#edcc61";
      // Yellow
      else if (squares[i].innerHTML == 512)
        squares[i].style.backgroundColor = "#edc850";
      // Dark yellow
      else if (squares[i].innerHTML == 1024)
        squares[i].style.backgroundColor = "#f07c5f";
      // Light red
      else if (squares[i].innerHTML == 2048)
        squares[i].style.backgroundColor = "#f0643b"; // Dark red
    }
  }

  addColors();

  let myTimer = setInterval(addColors, 50);

  createBoard(); // Call the createBoard function to initialize the game board.
});
