const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('reset');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    function handleCellClick(e) {
      const cell = e.target;
      const index = cell.getAttribute('data-index');

      if (gameState[index] !== "" || !gameActive) return;

      gameState[index] = currentPlayer;
      cell.textContent = currentPlayer;

      if (checkWinner()) {
        status.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
      } else if (!gameState.includes("")) {
        status.textContent = "It's a Draw!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Current Turn: ${currentPlayer}`;
      }
    }

    function checkWinner() {
      return winConditions.some(combination => {
        const [a, b, c] = combination;
        return (
          gameState[a] &&
          gameState[a] === gameState[b] &&
          gameState[a] === gameState[c]
        );
      });
    }

    function resetGame() {
      currentPlayer = 'X';
      gameActive = true;
      gameState = ["", "", "", "", "", "", "", "", ""];
      status.textContent = `Current Turn: ${currentPlayer}`;
      renderBoard();
    }

    function renderBoard() {
      board.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.textContent = gameState[i];
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
      }
    }

    resetBtn.addEventListener('click', resetGame);

    renderBoard();