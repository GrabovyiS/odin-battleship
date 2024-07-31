const getShipCoords = (gameboard, ship) => {
  if (!Object.prototype.hasOwnProperty.call(gameboard, 'board')) {
    return new Error('Must provide a proper gameboard to get coordinates');
  }

  const shipCoords = [];

  for (let i = 0; i < gameboard.board.length; i++) {
    for (let j = 0; j < gameboard.board.length; j++) {
      // The ship object is never repeated on the board
      if (gameboard.board[i][j] === ship) {
        shipCoords.push([i, j]);
      }
    }
  }

  if (shipCoords.length === 0) {
    return null;
  }

  return shipCoords;
};

export default getShipCoords;
