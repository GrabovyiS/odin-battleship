const getShipCoords = (gameboard, ship) => {
  const shipCoords = [];

  for (let i = 0; i < gameboard.board.length; i++) {
    for (let j = 0; j < gameboard.board.length; j++) {
      // The ship object is never repeated on the board
      if (gameboard.board[i][j] === ship) {
        shipCoords.push([i, j]);
      }
    }
  }

  return shipCoords;
};

export default getShipCoords;
